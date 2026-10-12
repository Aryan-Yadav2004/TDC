import bcrypt from 'bcryptjs';

export const MATCHMAKERS_SEED = [
  {
    id: 'mm_priya_01',
    name: 'Priya Sharma',
    email: 'priya@thedatecrew.com',
    password_hash: bcrypt.hashSync('tdc123', 10),
    role: 'senior_matchmaker',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Concierge Matchmaker with 7+ years curating high-trust relationships for founders, executives, and creative leaders across India and Southeast Asia.',
    active: 1
  },
  {
    id: 'mm_rohit_02',
    name: 'Rohit Verma',
    email: 'rohit@thedatecrew.com',
    password_hash: bcrypt.hashSync('tdc123', 10),
    role: 'lead_matchmaker',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Matchmaker specializing in tech entrepreneurs, investment banking professionals, and returnee NRIs.',
    active: 1
  },
  {
    id: 'mm_ananya_03',
    name: 'Ananya Sen',
    email: 'ananya@thedatecrew.com',
    password_hash: bcrypt.hashSync('tdc123', 10),
    role: 'relationship_coach',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bio: 'Relationship strategist and conversational coach helping relationship-ready professionals navigate deep emotional alignment.',
    active: 1
  }
];
