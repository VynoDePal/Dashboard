import React, { useState, useRef, useEffect } from 'react';
import { Menu, Send, Paperclip, Smile } from 'lucide-react';
import { Conversation, Message } from '../../types/chat';
import MessageBubble from './MessageBubble';
import UserAvatar from './UserAvatar';
import OnlineIndicator from './OnlineIndicator';

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onOpenSidebar: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messages,
  onSendMessage,
  onOpenSidebar,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage);
    setNewMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    
    // Auto-expand textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const participant = conversation.participants[0];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSidebar}
            className="sm:hidden p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <UserAvatar
                user={conversation.isGroup ? undefined : participant}
                groupName={conversation.groupName}
                groupAvatar={conversation.groupAvatar}
              />
              {!conversation.isGroup && (
                <OnlineIndicator status={participant.status} />
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {conversation.isGroup ? conversation.groupName : participant.name}
              </h2>
              {!conversation.isGroup && participant.status === 'online' && (
                <p className="text-sm text-green-500">Online</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'current-user'}
            showAvatar={
              index === 0 ||
              messages[index - 1].senderId !== message.senderId
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Smile className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              style={{ minHeight: '2.5rem', maxHeight: '10rem' }}
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow