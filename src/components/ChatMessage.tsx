import React from 'react';
import { User, Bot, Settings } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const getIcon = () => {
    if (isUser) return <User className="w-5 h-5" />;
    if (isSystem) return <Settings className="w-5 h-5" />;
    return <Bot className="w-5 h-5" />;
  };

  const getBgColor = () => {
    if (isUser) return 'bg-blue-500';
    if (isSystem) return 'bg-orange-500';
    return 'bg-teal-500';
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getBgColor()} flex items-center justify-center text-white`}>
        {getIcon()}
      </div>
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block p-3 rounded-lg ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-sm' 
            : isSystem
            ? 'bg-orange-100 text-orange-800 rounded-bl-sm border border-orange-200'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}>
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};