// Type definitions
export type Candidate = {
  id: string;
  name: string;
  position: string;
  party: string;
  votes: number;
};

export type Position = {
  id: string;
  title: string;
};

export type Voter = {
  id: string;
  name: string;
  email: string;
  hasVoted: boolean;
};

// Mock data
export const mockPositions: Position[] = [
  { id: "1", title: "President" },
  { id: "2", title: "Vice President" },
  { id: "3", title: "Secretary" },
  { id: "4", title: "Treasurer" },
];

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Smith",
    position: "President",
    party: "Democratic",
    votes: 150,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "President",
    party: "Republican",
    votes: 140,
  },
  {
    id: "3",
    name: "Mike Davis",
    position: "Vice President",
    party: "Democratic",
    votes: 145,
  },
  {
    id: "4",
    name: "Emily Wilson",
    position: "Vice President",
    party: "Republican",
    votes: 135,
  },
];

export const mockVoters: Voter[] = [
  {
    id: "1",
    name: "Alice Brown",
    email: "alice@example.com",
    hasVoted: true,
  },
  {
    id: "2",
    name: "Bob Martin",
    email: "bob@example.com",
    hasVoted: false,
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    hasVoted: true,
  },
];