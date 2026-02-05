import { TicketStatus, TicketPriority } from "@/components/ui/StatusBadge";

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
  };
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  content: string;
  createdAt: string;
  isStaff: boolean;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: string[];
}

export const categories = [
  { id: "billing", label: "Billing Support", icon: "CreditCard" },
  { id: "technical", label: "Technical Support", icon: "Server" },
  { id: "gameserver", label: "Game Server Support", icon: "Gamepad2" },
  { id: "account", label: "Account Help", icon: "User" },
  { id: "general", label: "General Inquiry", icon: "HelpCircle" },
];

export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Server keeps crashing after update",
    description: "My Minecraft server has been crashing every few hours since the latest update.",
    category: "gameserver",
    status: "open",
    priority: "high",
    createdAt: "2025-02-05T10:30:00Z",
    updatedAt: "2025-02-05T10:30:00Z",
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    messages: [
      {
        id: "msg-1",
        content: "My Minecraft server has been crashing every few hours since the latest update. The console shows memory errors before each crash. I've tried restarting multiple times but the issue persists.",
        createdAt: "2025-02-05T10:30:00Z",
        isStaff: false,
        author: { id: "1", name: "John Doe" },
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "Invoice question for January",
    description: "I have a question about my January invoice charges.",
    category: "billing",
    status: "answered",
    priority: "medium",
    createdAt: "2025-02-04T15:00:00Z",
    updatedAt: "2025-02-05T09:00:00Z",
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    assignedTo: { id: "staff-1", name: "Sarah Support" },
    messages: [
      {
        id: "msg-2",
        content: "I noticed an extra charge on my January invoice. Can you explain what this is for?",
        createdAt: "2025-02-04T15:00:00Z",
        isStaff: false,
        author: { id: "1", name: "John Doe" },
      },
      {
        id: "msg-3",
        content: "Hi John! The extra charge is for the additional RAM upgrade you requested on January 15th. You can see the details in your billing panel under 'Upgrades'. Let me know if you need anything else!",
        createdAt: "2025-02-05T09:00:00Z",
        isStaff: true,
        author: { id: "staff-1", name: "Sarah Support" },
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "Need help setting up FTP access",
    description: "How do I configure FTP access for my server?",
    category: "technical",
    status: "waiting",
    priority: "low",
    createdAt: "2025-02-03T08:00:00Z",
    updatedAt: "2025-02-04T14:00:00Z",
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    assignedTo: { id: "staff-2", name: "Mike Tech" },
    messages: [
      {
        id: "msg-4",
        content: "I need to upload some files to my server but don't know how to set up FTP access.",
        createdAt: "2025-02-03T08:00:00Z",
        isStaff: false,
        author: { id: "1", name: "John Doe" },
      },
      {
        id: "msg-5",
        content: "You can find your FTP credentials in the Game Panel under 'Settings'. Could you let me know if you need the step-by-step guide?",
        createdAt: "2025-02-04T14:00:00Z",
        isStaff: true,
        author: { id: "staff-2", name: "Mike Tech" },
      },
    ],
  },
  {
    id: "TKT-004",
    subject: "Account email change request",
    description: "I need to update my account email address.",
    category: "account",
    status: "closed",
    priority: "low",
    createdAt: "2025-02-01T12:00:00Z",
    updatedAt: "2025-02-02T10:00:00Z",
    user: { id: "1", name: "John Doe", email: "john@example.com" },
    assignedTo: { id: "staff-1", name: "Sarah Support" },
    messages: [
      {
        id: "msg-6",
        content: "Please change my email from john@old.com to john@example.com",
        createdAt: "2025-02-01T12:00:00Z",
        isStaff: false,
        author: { id: "1", name: "John Doe" },
      },
      {
        id: "msg-7",
        content: "Done! Your email has been updated successfully. You can now log in with your new email.",
        createdAt: "2025-02-02T10:00:00Z",
        isStaff: true,
        author: { id: "staff-1", name: "Sarah Support" },
      },
    ],
  },
];

export const mockStats = {
  openTickets: 12,
  resolvedToday: 8,
  avgResponseTime: "1.5h",
  satisfaction: 98,
};

export const mockAdminStats = {
  totalTickets: 156,
  openTickets: 24,
  answeredTickets: 18,
  closedTickets: 114,
  avgResponseTime: "42m",
  satisfactionRate: 98,
  ticketsToday: 12,
  resolvedToday: 8,
};

export const mockStaff = [
  { id: "staff-1", name: "Sarah Support", role: "admin", ticketsResolved: 45, avgRating: 4.9 },
  { id: "staff-2", name: "Mike Tech", role: "support", ticketsResolved: 38, avgRating: 4.7 },
  { id: "staff-3", name: "Alex Helper", role: "moderator", ticketsResolved: 22, avgRating: 4.8 },
];