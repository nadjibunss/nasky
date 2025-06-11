import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: string, isUser: boolean) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    id: '1',
    message: 'Hello! I\'m your AI Gym Coach. How can I help you achieve your fitness goals today?',
    isUser: false,
    timestamp: new Date()
  }]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (message: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser,
      timestamp: new Date()
    };
    console.log('Adding chat message:', newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    console.log('Clearing chat messages');
    setMessages([{
      id: '1',
      message: 'Hello! I\'m your AI Gym Coach. How can I help you achieve your fitness goals today?',
      isUser: false,
      timestamp: new Date()
    }]);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      clearMessages,
      isLoading,
      setIsLoading,
      isOpen,
      setIsOpen
    }} data-id="6chgymx5p" data-path="src/contexts/ChatContext.tsx">
      {children}
    </ChatContext.Provider>);

};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};