import React, { useState, useEffect, useRef } from 'react';
import { X, Paperclip, ChevronDown } from 'lucide-react';

interface NewEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewEmailModal: React.FC<NewEmailModalProps> = ({ isOpen, onClose }) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleAddRecipient = (email: string) => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRecipients([...recipients, email]);
      setCurrentRecipient('');
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddRecipient(currentRecipient);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div
          ref={modalRef}
          className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle"
        >
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                New Message
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <label className="sr-only">To:</label>
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 p-2">
                  {recipients.map((email) => (
                    <span
                      key={email}
                      className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:text-blue-200"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveRecipient(email)}
                        className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="email"
                    value={currentRecipient}
                    onChange={(e) => setCurrentRecipient(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleAddRecipient(currentRecipient)}
                    className="flex-1 border-0 bg-transparent p-0 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Enter email addresses..."
                  />
                </div>
              </div>

              <div>
                <label className="sr-only">Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="sr-only">Message:</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="Write your message..."
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <div className="mr-auto flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Attach
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                More
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmailModal;