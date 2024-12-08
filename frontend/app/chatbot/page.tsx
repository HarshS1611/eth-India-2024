// File: /pages/chatbot.tsx
"use client";
import { useState, useCallback} from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import axios from "axios";
import {BASE_SEPOLIA_CHAIN_ID, escrowCalls} from "./../../blockchain/main"

export default function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
 const handleOnStatus = useCallback((status: any) => {
    console.log("LifecycleStatus", status);
    if(status.statusName == "success")
      {
        console.log("put on chain")
      }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: "chat", userInput }),
      });

      const data = await res.json();
      console.log(responses.length)

      if (res.ok) {
        const agentMessages = data[0]?.agent?.messages || [];
        const content = agentMessages[0]?.kwargs?.content || '';
        setResponses(prev => [...prev, userInput, content]);
        setUserInput('');
      } else {
        setResponses(prev => [...prev, `Error: ${data.error}`]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResponses(prev => [...prev, 'An error occurred while fetching data']);
    }
  };

  return (
    <div className="flex w-full  bg-black  justify-center">
      <div className=" h-screen w-full border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
        <Navbar />
        <div className="w-full h-[85vh] flex flex-col  text-white overflow-hidden">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {responses.map((response, index) => (
              <div key={index} className={`rounded-lg px-4 py-2 ${index % 2 === 0 ? 'bg-blue-600 ml-auto w-fit' : 'bg-gray-700'}`}>
                {response}
              </div>
            ))}
            {responses.length === 2 && (
  <Transaction
    chainId={BASE_SEPOLIA_CHAIN_ID}
    calls={escrowCalls.createP2CChallenge()}
    onStatus={handleOnStatus}
    className="bg-blue-700 text-white"
  >
    <TransactionButton text="challenge AI !"/>
    <TransactionSponsor />
  
  </Transaction>
)}
          </div>
          <div className="flex p-4 bg-gray-800">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}