import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ChatInterface from './components/ChatInterface/chatinterface';
import { Message, Chat } from './components/types';

const App: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [nextChatNumber, setNextChatNumber] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Create initial chat when component mounts
  useEffect(() => {
    const initialChatId = `chat-${Date.now()}`;
    setActiveChatId(initialChatId);
    setChats([{
      id: initialChatId,
      title: 'New Chat',
      messages: [],
      selected: false
    }]);
  }, []);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setActiveChatId(newChatId);
    setChats(prev => [...prev, {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      selected: false
    }]);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleToggleChatSelect = (chatId: string, selected: boolean) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, selected } : chat
    ));
  };

  const handleUpdateChatTitle = (chatId: string, newTitle: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  const handleMessageSent = (chatId: string, message: Message) => {
    setChats(prev => {
      const updatedChats = [...prev];
      const chatIndex = updatedChats.findIndex(chat => chat.id === chatId);
      
      if (chatIndex === -1) return prev;
      
      let newMessages = [...updatedChats[chatIndex].messages];
      
      if (message.sender === 'loading') {
        newMessages = newMessages.filter(m => !m.id.includes('-loading'));
      }
      else if (message.sender === 'bot') {
        newMessages = newMessages.filter(m => !m.id.includes('-loading'));
      }
      
      newMessages.push(message);
      
      updatedChats[chatIndex] = {
        ...updatedChats[chatIndex],
        messages: newMessages
      };
      
      if (updatedChats[chatIndex].title === 'New Chat' && message.sender === 'user') {
        updatedChats[chatIndex].title = `Chat ${nextChatNumber}: ${
          message.text.length > 30 
            ? `${message.text.substring(0, 30)}...` 
            : message.text
        }`;
        setNextChatNumber(n => n + 1);
      }
      
      return updatedChats;
    });
  };

  const handleDdlContentChange = (content: string) => {
    console.log('DDL content updated:', content);
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
  };

  const handleTranslate = () => {
    console.log('Translate button clicked');
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleProfileClick = () => {
    console.log('Profile button clicked');
  };

  const getActiveChatMessages = () => {
    const activeChat = chats.find(chat => chat.id === activeChatId);
    return activeChat ? activeChat.messages : [];
  };

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        chats={chats}
        activeChatId={activeChatId}
        onToggleChatSelect={handleToggleChatSelect}
        onDdlContentChange={handleDdlContentChange}
        onFileUpload={handleFileUpload}
      />

      <div className={`chat-section ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        {activeChatId && (
          <ChatInterface 
            key={activeChatId}
            chatId={activeChatId}
            messages={getActiveChatMessages()}
            onMessageSent={handleMessageSent}
            onTranslate={handleTranslate}
            onToggleTheme={handleToggleTheme}
            onProfileClick={handleProfileClick}
            currentTheme={theme}
            onUpdateChatTitle={handleUpdateChatTitle}
            currentChatTitle={chats.find(chat => chat.id === activeChatId)?.title || 'New Chat'}
          />
        )}
      </div>
    </div>
  );
};

export default App;