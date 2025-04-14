import React from 'react';
import { X, Reply, Forward, Trash2, Star, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Email } from '../../types/email';

interface EmailViewerProps {
  email: Email;
  onClose: () => void;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ email, onClose }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {email.subject}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-start mb-6">
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

          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {email.from.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {email.from.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    email.starred ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(email.date), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
            </div>

            {email.to && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                To: {email.to.map(recipient => recipient.email).join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {email.content}
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Attachments ({email.attachments.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {email.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {attachment.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {attachment.size}
                    </p>
                  </div>
                  <button
                    className="ml-4 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    aria-label="Download attachment"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </button>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailViewer;