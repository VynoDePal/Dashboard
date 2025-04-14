import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types/chat';
import UserAvatar from './UserAvatar';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar,
}) => {
  return (
    <div
      className={`flex items-end space-x-2 ${
        isOwn ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      {showAvatar && !isOwn && (
        <UserAvatar size="sm" />
      )}
      
      <div
        className={`
          group relative max-w-md px-4 py-2 rounded-t-lg
          ${isOwn
            ? 'bg-blue-600 text-white rounded-l-lg'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-lg'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <div
          className={`
            absolute bottom-0 ${isOwn ? 'left-0' : 'right-0'}
            transform ${isOwn ? '-translate-x-full' : 'translate-x-full'}
            flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity
          `}
        >
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isOwn && (
            message.read ? (
              <CheckCheck className="h-4 w-4 text-blue-500" />
            ) : (
              <Check className="h-4 w-4" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble