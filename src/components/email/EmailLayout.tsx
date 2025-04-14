import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import EmailViewer from './EmailViewer';
import NewEmailModal from './NewEmailModal';
import { generateMockEmails } from '../../utils/mockEmailData';

const EmailLayout: React.FC = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [emails] = useState(generateMockEmails(20));
  const [isNewEmailOpen, setIsNewEmailOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const selectedEmail = emailId ? emails.find(e => e.id === emailId) : null;

  const handleEmailSelect = (id: string) => {
    navigate(`/emails/${id}`);
    setIsViewerOpen(true);
  };

  const handleNewEmail = () => {
    setIsNewEmailOpen(true);
    navigate('/emails/new');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar onNewEmail={handleNewEmail} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Email List */}
      <div className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900">
        <EmailList
          emails={emails}
          selectedEmailId={emailId}
          onEmailSelect={handleEmailSelect}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Email Viewer */}
      <div
        className={`
          fixed inset-y-0 right-0 z-30 w-full md:w-1/2 lg:w-2/5 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isViewerOpen && selectedEmail ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {selectedEmail && (
          <EmailViewer
            email={selectedEmail}
            onClose={() => {
              setIsViewerOpen(false);
              navigate('/emails');
            }}
          />
        )}
      </div>

      {/* New Email Modal */}
      <NewEmailModal
        isOpen={isNewEmailOpen}
        onClose={() => {
          setIsNewEmailOpen(false);
          navigate('/emails');
        }}
      />
    </div>
  );
};

export default EmailLayout;