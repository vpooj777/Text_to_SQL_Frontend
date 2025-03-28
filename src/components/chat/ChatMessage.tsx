interface ChatMessageProps {
    sender: "user" | "ai";
    message: string;
  }
  
  export default function ChatMessage({ sender, message }: ChatMessageProps) {
    return (
      <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`p-3 rounded-lg max-w-xs ${
            sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {message}
        </div>
      </div>
    );
  }
  