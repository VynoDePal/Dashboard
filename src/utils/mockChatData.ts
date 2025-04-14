import { Conversation, Message, User, UserStatus } from '../types/chat';

const statuses: UserStatus[] = ['online', 'offline', 'away', 'busy'];

const generateMockUser = (id: string): User => ({
  id,
  name: `User ${id}`,
  avatar: `https://i.pravatar.cc/150?u=${id}`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  lastSeen: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
});

export const generateMockConversations = (count: number): Conversation[] => {
  return Array.from({ length: count }, (_, i) => {
    const isGroup = Math.random() > 0.7;
    const participants = [generateMockUser(`user-${i + 1}`)];

    if (isGroup) {
      participants.push(
        generateMockUser(`user-${i + 2}`),
        generateMockUser(`user-${i + 3}`)
      );
    }

    return {
      id: `conv-${i + 1}`,
      participants,
      unreadCount: Math.floor(Math.random() * 5),
      isGroup,
      ...(isGroup && {
        groupName: `Group ${i + 1}`,
        groupAvatar: `https://picsum.photos/200/200?random=${i}`,
      }),
    };
  });
};

export const generateMockMessages = (count: number): Message[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i + 1}`,
    conversationId: `conv-${Math.floor(i / 5) + 1}`,
    senderId: Math.random() > 0.5 ? 'current-user' : `user-${Math.floor(i / 3) + 1}`,
    type: 'text',
    content: `This is message ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    timestamp: new Date(Date.now() - (count - i) * 5 * 60 * 1000).toISOString(),
    read: Math.random() > 0.3,
  }));
};