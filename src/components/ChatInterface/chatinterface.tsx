import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import { FiSun, FiMoon, FiGlobe, FiUser } from 'react-icons/fi';
import { Message } from '../types';

interface ChatInterfaceProps {
  chatId: string;
  messages: Message[];
  onMessageSent: (chatId: string, message: Message) => void;
  onTranslate: () => void;
  onToggleTheme: () => void;
  onProfileClick: () => void;
  currentTheme: 'light' | 'dark';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chatId, 
  messages,
  onMessageSent,
  onTranslate,
  onToggleTheme,
  onProfileClick,
  currentTheme
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeedback = (messageId: string, reaction: 'up' | 'down') => {
    console.log(`Feedback ${reaction} for message ${messageId}`);
  };

  const copySqlToClipboard = (sql: string) => {
    navigator.clipboard.writeText(sql);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isBotThinking) return;
  
    const messageTimestamp = Date.now();
  
    // User message
    const userMessage: Message = {
      id: `msg-${messageTimestamp}-user`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(messageTimestamp),
    };
    onMessageSent(chatId, userMessage);
  
    // Loading message
    const loadingMessage: Message = {
      id: `msg-${messageTimestamp}-loading`,
      text: 'Generating SQL response...',
      sender: 'loading',
      timestamp: new Date(messageTimestamp + 1),
    };
    onMessageSent(chatId, loadingMessage);
  
    setInputValue('');
    setIsBotThinking(true);
  
    setTimeout(() => {
      // Bot response
      const botMessage: Message = {
        id: `msg-${messageTimestamp}-bot`,
        text: `Based on your request, here's the SQL query:`,
        sender: 'bot',
        timestamp: new Date(),
        showFeedback: true,
        sqlQuery: `SELECT * FROM ${inputValue.toLowerCase().split(' ')[0] || 'users'} LIMIT 10;`
      };
      
      // This will automatically replace the loading message
      onMessageSent(chatId, botMessage);
      setIsBotThinking(false);
    }, 1000);
  };

  const chatTitle = messages.length > 0 
    ? messages.find(m => m.sender === 'user')?.text || 'New Chat'
    : 'New Chat';

  return (
    <div className={`chat-interface ${currentTheme}`}>
      {/* Fixed App Header */}
      <div className="app-header">
        <h1 className="app-title">Text to SQL</h1>
      </div>

      {/* Chat Header with Action Buttons */}
      <div className="chat-header">
        <h3 className="chat-title">
          {chatTitle.length > 30 ? `${chatTitle.substring(0, 30)}...` : chatTitle}
        </h3>
        <div className="action-buttons">
          <button onClick={onTranslate} className="action-btn" title="Translate">
            <FiGlobe />
          </button>
          <button onClick={onToggleTheme} className="action-btn" title="Toggle Theme">
            {currentTheme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          <button onClick={onProfileClick} className="action-btn" title="Profile">
            <FiUser />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Welcome to your new chat! Start typing to begin the conversation.</p>
            <p>You can ask questions about your database schema or request SQL queries.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message-wrapper ${message.sender}`}>
              {message.sender === 'loading' ? (
                <div className="message loading">
                  <div className="message-content">
                    <p>{message.text}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`message ${message.sender}`}>
                    <div className="message-content">
                      <p>{message.text}</p>
                      {message.sqlQuery && (
                        <div className="sql-query">
                          <pre>{message.sqlQuery}</pre>
                          <button 
                            className="copy-sql-btn" 
                            onClick={() => copySqlToClipboard(message.sqlQuery || '')}
                          >
                            Copy SQL
                          </button>
                        </div>
                      )}
                      <span className="timestamp">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {message.sender === 'bot' && message.showFeedback && (
                    <div className="feedback-attached">
                      <span className="feedback-prompt">Was this response helpful?</span>
                      <div className="feedback-buttons">
                        <button onClick={() => handleFeedback(message.id, 'up')}>👍</button>
                        <button onClick={() => handleFeedback(message.id, 'down')}>👎</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your SQL question here..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isBotThinking}
        />
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={isBotThinking || inputValue.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;