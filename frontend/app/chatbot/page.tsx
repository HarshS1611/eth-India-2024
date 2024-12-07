// File: /pages/chatbot.tsx
"use client";
import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);

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