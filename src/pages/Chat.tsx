import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatLayout from '../components/chat/ChatLayout';

const Chat: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/*" element={<ChatLayout />}>
          <Route path=":conversationId" element={null} />
        </Route>
      </Routes>
    </div>
  );
};

export default Chat;