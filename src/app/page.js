'use client';

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { messages: updated });
      const reply = res.data.reply;

      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

      <div className="w-full max-w-3xl h-[90vh] bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/30">

        {/* Header */}
        <div className="text-center py-5 border-b border-white/30 text-white text-2xl font-semibold">
          🤖 AI Chat Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-white/80 mt-20 text-lg">
              Start a conversation...
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-sm md:max-w-md text-sm shadow-lg ${
                  msg.role === "user"
                    ? "bg-white text-gray-800 rounded-br-none"
                    : "bg-black/30 text-white rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/30 bg-white/10 backdrop-blur-md">
          <div className="flex gap-3 items-end">
            <textarea
              className="flex-1 resize-none rounded-xl p-3 bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:scale-105 transition duration-200"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
