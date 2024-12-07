// File: /Users/harshsingh/projects/eth-India-2024/frontend/app/api/chat/chatbot.ts

import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";

dotenv.config();

function validateEnvironment(): void {
  const missingVars: string[] = [];
  
  const requiredVars = ["XAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY"];
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set");
    missingVars.forEach(varName => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`);
    });
    process.exit(1);
  }

  if (!process.env.NETWORK_ID) {
    console.warn("Warning: NETWORK_ID not set, defaulting to base-sepolia testnet");
  }
}

validateEnvironment();

const WALLET_DATA_FILE = "wallet_data.txt";

async function initializeAgent() {
  try {
    const llm = new ChatOpenAI({
      model: "grok-beta",
      apiKey: process.env.XAI_API_KEY,
      configuration: {
        baseURL: "https://api.x.ai/v1"
      }
    });

    let walletDataStr: string | null = null;

    if (fs.existsSync(WALLET_DATA_FILE)) {
      try {
        walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
      } catch (error) {
        console.error("Error reading wallet data:", error);
        // Continue without wallet data
      }
    }

    const config = {
      cdpWalletData: walletDataStr || undefined,
      networkId: process.env.NETWORK_ID || "base-sepolia",
    };

    const agentkit = await CdpAgentkit.configureWithWallet(config);

    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    const memory = new MemorySaver();
    const agentConfig = { configurable: { thread_id: "CDP Agentkit Chatbot Example!" } };

    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
      You are a fitness coach who creates engaging daily challenges for people looking to stay active. Your task is to generate a new fitness challenge each day. Each challenge should have three components:
      
      1. Challenge Name: A catchy title for the challenge
      2. Category: The type of exercise or activity (e.g., cardio, strength training, flexibility, balance)
      3. Reward: 0.0001 eth on base sepolia testnet for the one who completes the challenge
      
      You are a helpful agent that can interact onchain using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet if you are on network ID \`base-sepolia\`. If not, you can provide your wallet details and request funds from the user. If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested. 

        Your job is to generate a new fitness challenge each day. Each challenge should have three components:
        1. Challenge Name: A catchy title for the challenge
        2. Category: The type of exercise or activity (e.g., cardio, strength training, flexibility, balance)
        3. Reward: 0.0001 eth on base sepolia testnet for the one who completes the challenge

        Present the challenge in the following format:
        
        Challenge Name: [Insert Challenge Name]
        Category: [Insert Category]
        Reward: Complete this challenge and earn [Insert Reward]
        
        Generate a new challenge for each query you receive.

        Also after giving the challenge you have to track the user's progress and give feedback on their performance. Based on the sentiment analysis of their performance, you have to determine whether they passed or failed the challenge.

        Here's how you should proceed:
        1. Generate a new challenge and present it to the user.
        2. Ask the user to complete the challenge and report back with their experience.
        3. Once the user provides feedback, analyze it to determine if they succeeded or failed.
        4. If the user succeeded, inform them that they will receive the reward (0.0001 eth) on base sepolia testnet.
        5. If the user failed, explain why and encourage them to try again tomorrow.
        6. Do not generate a new challenge until the next day or unless explicitly instructed to do so.
        Remember to maintain a friendly and encouraging tone throughout the interaction.

        Finally, provide a final decision in one word ("pass" or "fail") so that the user can trigger a function to get the reward through a prompt.
    `,
    });

    const exportedWallet = await agentkit.exportWallet();
    fs.writeFileSync(WALLET_DATA_FILE, exportedWallet);

    return { agent, config: agentConfig };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

async function runAutonomousMode(agent: any, config: any, interval = 10) {
  console.log("Starting autonomous mode...");
  
  while (true) {
    try {
      const thought =
        "Be creative and do something interesting on the blockchain. Choose an action or set of actions and execute it that highlights your abilities.";

      const stream = await agent.stream({ messages: [new HumanMessage(thought)] }, config);

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
        }
        console.log("-------------------");
      }

      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
      process.exit(1);
    }
  }
}

async function runChatMode(agent: any, config: any,userInput:any) {
    return agent.stream({ messages: [new HumanMessage(userInput)] }, config);

}

async function chooseMode(): Promise<"chat" | "auto"> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> =>
    new Promise(resolve => rl.question(prompt, resolve));

  while (true) {
   

    const choice = (await question("\nChoose a mode (enter number or name): "))
      .toLowerCase()
      .trim();

    if (choice === "1" || choice === "chat") {
      rl.close();
      return "chat";
    } else if (choice === "2" || choice === "auto") {
      rl.close();
      return "auto";
    }
    console.log("Invalid choice. Please try again.");
  }
}




export { initializeAgent, runChatMode, runAutonomousMode };