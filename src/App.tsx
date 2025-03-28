import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ChatInterface from './components/ChatInterface/chatinterface';

const App: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      {/* Sidebar with smooth toggling */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
        onSelectChat={setSelectedChat} 
      />

      {/* Main Chat Area */}
      <div className={`chat-section ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        {selectedChat ? (
          <ChatInterface chatId={selectedChat} />
        ) : (
          <div className="placeholder">
            <h2>Select a chat to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
