interface EmailRecipient {
  name: string;
  email: string;
}

interface EmailAttachment {
  name: string;
  size: string;
  type: string;
}

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to?: EmailRecipient[];
  subject: string;
  preview: string;
  content: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachments: boolean;
  attachments?: EmailAttachment[];
  labels?: string[];
}