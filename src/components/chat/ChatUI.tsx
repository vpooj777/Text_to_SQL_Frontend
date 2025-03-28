import "./chat.css";
import { useState } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { sender: "ai", message: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", message: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: "This is a sample AI response." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-white h-screen">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender as "user" | "ai"} message={msg.message} />
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center p-3 border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}
