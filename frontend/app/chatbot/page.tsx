// File: /pages/chatbot.tsx
"use client";
import { useState } from 'react';


export default function Chatbot() {
  const [mode, setMode] = useState<'chat' | 'auto'>('chat');
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mode, userInput });
    try {

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',

      },
      body: JSON.stringify({ mode, userInput }),
    });

    const data = await res.json();
    console.log(data);

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
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value as 'chat' | 'auto')}>
              <option value="chat">Chat</option>
              <option value="auto">Autonomous</option>
            </select>
          </label>
        </div>
        {mode === 'chat' && (
          <div>
            <label>
              User Input:
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </label>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Responses</h2>
        <ul>
          {responses.map((response, index) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}