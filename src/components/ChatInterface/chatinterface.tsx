import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  showFeedback?: boolean;
}

interface ChatInterfaceProps {
  chatId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your DDL content today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeedback = (messageId: string, reaction: 'up' | 'down') => {
    console.log(`Feedback ${reaction} for message ${messageId}`);
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, showFeedback: false } : msg))
    );
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message about "${inputValue}". This is a simulated response.`,
        sender: 'bot',
        timestamp: new Date(),
        showFeedback: true,
      };
      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="chat-interface">
      {/* Chat Header */}
      <div className="chat-header">
        <h3>Chat with {chatId}</h3>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.sender}`}>
            <div className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Feedback UI */}
            {message.sender === 'bot' && message.showFeedback && (
              <div className="feedback-attached">
                <span className="feedback-prompt">Was this response helpful?</span>
                <div className="feedback-buttons">
                  <button onClick={() => handleFeedback(message.id, 'up')}>👍</button>
                  <button onClick={() => handleFeedback(message.id, 'down')}>👎</button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
