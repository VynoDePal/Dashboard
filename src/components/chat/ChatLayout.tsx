import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationsList from './ConversationsList';
import ChatWindow from './ChatWindow';
import { Conversation, Message } from '../../types/chat';
import { generateMockConversations, generateMockMessages } from '../../utils/mockChatData';

const ChatLayout: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState<Conversation[]>(generateMockConversations(10));
  const [messages, setMessages] = useState<Message[]>(generateMockMessages(20));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeConversation = conversations.find(c => c.id === conversationId);

  const handleConversationSelect = (conversation: Conversation) => {
    navigate(`/chat/${conversation.id}`);
    setIsMobileMenuOpen(false);
  };

  const handleSendMessage = (content: string) => {
    if (!conversationId) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: 'current-user',
      type: 'text',
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation's last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: newMessage, unreadCount: 0 }
          : conv
      )
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div
        className={`
          w-full sm:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          ${isMobileMenuOpen ? 'fixed inset-0 z-40' : 'hidden sm:block'}
        `}
      >
        <ConversationsList
          conversations={conversations}
          activeConversationId={conversationId}
          onConversationSelect={handleConversationSelect}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {conversationId && activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messages={messages.filter(m => m.conversationId === conversationId)}
            onSendMessage={handleSendMessage}
            onOpenSidebar={() => setIsMobileMenuOpen(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatLayout;