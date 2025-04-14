export type MessageType = 'text' | 'image' | 'file';
export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string;
  timestamp: string;
  read: boolean;
  reactions?: string[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}