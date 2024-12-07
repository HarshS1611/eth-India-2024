// File: /Users/harshsingh/projects/eth-India-2024/frontend/app/api/chat/route.ts

import { NextApiHandler } from 'next';
import { NextResponse } from 'next/server';
import { initializeAgent, runChatMode, runAutonomousMode } from './chatbot';

let agent: any;
let config: any;

async function initializeAgentIfNeeded() {
  if (!agent) {
    ({ agent, config } = await initializeAgent());
  }
}

const POST: NextApiHandler = async (req, res) => {
  try {
    await initializeAgentIfNeeded();

    const { mode, userInput } = await req.json();

    if (mode === 'chat') {
      const stream = await runChatMode(agent, config,userInput);
      const responses = [];
      for await (const response of stream) {
        responses.push(response);
      }
      
    

      return NextResponse.json(responses, { status: 200 });
    } else if (mode === 'auto') {
      await runAutonomousMode(agent, config);
      return NextResponse.json({ message: 'Autonomous mode started' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { POST };