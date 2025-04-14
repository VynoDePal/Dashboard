import React, { useState } from 'react';
import { Search, Menu, Star, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import { Email } from '../../types/email';

interface EmailListProps {
  emails: Email[];
  selectedEmailId?: string;
  onEmailSelect: (id: string) => void;
  onOpenSidebar: () => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmailId,
  onEmailSelect,
  onOpenSidebar,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEmails.map((email) => (
          <button
            key={email.id}
            onClick={() => onEmailSelect(email.id)}
            className={`
              w-full flex items-start p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
              ${selectedEmailId === email.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              ${!email.read ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
            `}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {email.from.avatar ? (
                <img
                  src={email.from.avatar}
                  alt={email.from.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  {email.from.name[0]}
                </span>
              )}
            </div>

            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${!email.read ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                  {email.from.name}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(email.date), 'MMM d')}
                </span>
              </div>
              <p className={`mt-1 text-sm ${!email.read ? 'font-medium text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                {email.subject}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                {email.preview}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {email.starred && (
                  <Star className="w-4 h-4 text-yellow-400" />
                )}
                {email.hasAttachments && (
                  <Paperclip className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmailList;