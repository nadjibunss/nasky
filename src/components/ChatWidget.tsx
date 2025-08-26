import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Bot,
  User } from
'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { chatService } from '@/services/apiService';
import { useApiCall } from '@/hooks/useApiCall';

const ChatWidget: React.FC = () => {
  const {
    messages,
    addMessage,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { execute: sendChatMessage } = useApiCall(chatService.sendMessage);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    addMessage(userMessage, true);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(userMessage);
      addMessage(response, false);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon" data-id="d0tt9y5ch" data-path="src/components/ChatWidget.tsx">

        <MessageCircle className="h-6 w-6 text-white" data-id="el7xhze09" data-path="src/components/ChatWidget.tsx" />
      </Button>);

  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-gray-900 border-orange-500/20 shadow-2xl z-50 flex flex-col" data-id="v8aj6tj5f" data-path="src/components/ChatWidget.tsx">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-t-lg" data-id="6yg0sf8pm" data-path="src/components/ChatWidget.tsx">
        <div className="flex items-center space-x-2" data-id="2nu6vz0m1" data-path="src/components/ChatWidget.tsx">
          <Bot className="h-5 w-5 text-white" data-id="5fi0deft6" data-path="src/components/ChatWidget.tsx" />
          <h3 className="font-semibold text-white" data-id="qifun0sv6" data-path="src/components/ChatWidget.tsx">Pelatih Gym AI</h3>
        </div>
        <div className="flex items-center space-x-1" data-id="7s9xtmhx9" data-path="src/components/ChatWidget.tsx">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:bg-white/20" data-id="k4ncn5tj0" data-path="src/components/ChatWidget.tsx">

            <Minimize2 className="h-3 w-3" data-id="zfs3hxhjc" data-path="src/components/ChatWidget.tsx" />
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:bg-white/20" data-id="lv67ew8zc" data-path="src/components/ChatWidget.tsx">

            <X className="h-3 w-3" data-id="ycmkizyl6" data-path="src/components/ChatWidget.tsx" />
          </Button>
        </div>
      </div>

      {!isMinimized &&
      <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" data-id="mve04qorn" data-path="src/components/ChatWidget.tsx">
            <div className="space-y-4" data-id="d2prnztwl" data-path="src/components/ChatWidget.tsx">
              {messages.map((msg) =>
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`} data-id="3r4costwe" data-path="src/components/ChatWidget.tsx">

                  <div
                className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser ?
                'bg-orange-600 text-white' :
                'bg-gray-700 text-gray-100'}`
                } data-id="u0dy5bs36" data-path="src/components/ChatWidget.tsx">

                    <div className="flex items-start space-x-2" data-id="1abe99yso" data-path="src/components/ChatWidget.tsx">
                      {!msg.isUser && <Bot className="h-4 w-4 mt-0.5 text-orange-400" data-id="weofeutj4" data-path="src/components/ChatWidget.tsx" />}
                      {msg.isUser && <User className="h-4 w-4 mt-0.5 text-white" data-id="3zjaeep12" data-path="src/components/ChatWidget.tsx" />}
                      <p className="text-sm" data-id="dqt35eog2" data-path="src/components/ChatWidget.tsx">{msg.message}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1" data-id="43b5ergy5" data-path="src/components/ChatWidget.tsx">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
            )}
              
              {isLoading &&
            <div className="flex justify-start" data-id="dkcto00mb" data-path="src/components/ChatWidget.tsx">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-[80%]" data-id="yewkuly8n" data-path="src/components/ChatWidget.tsx">
                    <div className="flex items-center space-x-2" data-id="l50st5k32" data-path="src/components/ChatWidget.tsx">
                      <Bot className="h-4 w-4 text-orange-400" data-id="aduri9t9p" data-path="src/components/ChatWidget.tsx" />
                      <div className="flex space-x-1" data-id="jwmoze1s5" data-path="src/components/ChatWidget.tsx">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" data-id="lwbfzc2wf" data-path="src/components/ChatWidget.tsx"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} data-id="9pkjn4lpr" data-path="src/components/ChatWidget.tsx"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} data-id="svcwh3xxl" data-path="src/components/ChatWidget.tsx"></div>
                      </div>
                    </div>
                  </div>
                </div>
            }
              
              <div ref={messagesEndRef} data-id="30qlgwcnj" data-path="src/components/ChatWidget.tsx" />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-700" data-id="fw0xvmtnl" data-path="src/components/ChatWidget.tsx">
            <div className="flex space-x-2" data-id="wgsajt1ko" data-path="src/components/ChatWidget.tsx">
              <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanya pelatih AI Anda..."
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
              disabled={isLoading} data-id="stusxmu5m" data-path="src/components/ChatWidget.tsx" />

              <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white"
              size="icon" data-id="fkxu71ssw" data-path="src/components/ChatWidget.tsx">

                <Send className="h-4 w-4" data-id="81vfu4iui" data-path="src/components/ChatWidget.tsx" />
              </Button>
            </div>
          </div>
        </>
      }
    </Card>);

};

export default ChatWidget;