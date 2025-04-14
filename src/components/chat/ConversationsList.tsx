import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Conversation } from '../../types/chat';
import UserAvatar from './UserAvatar';
import OnlineIndicator from './OnlineIndicator';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationSelect: (conversation: Conversation) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  activeConversationId,
  onConversationSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    const searchTerm = searchQuery.toLowerCase();
    if (conversation.isGroup) {
      return conversation.groupName?.toLowerCase().includes(searchTerm);
    }
    return conversation.participants[0].name.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId;
          const participant = conversation.participants[0];

          return (
            <button
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`
                w-full p-4 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}
              `}
            >
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {conversation.isGroup ? conversation.groupName : participant.name}
                  </p>
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                {conversation.lastMessage && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {conversation.lastMessage.content}
                  </p>
                )}
                {conversation.unreadCount > 0 && (
                  <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList