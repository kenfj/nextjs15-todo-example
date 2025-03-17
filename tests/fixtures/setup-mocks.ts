import { Session } from 'next-auth';
import { vi } from 'vitest';

// Vitest Guide Mocking: https://vitest.dev/guide/mocking

const mockSession: Session = {
  user: {
    id: 'mock-user-id',
    name: 'Mock User',
    email: 'mockuser@example.com',
    image: 'mock-user-image'
  },
  expires: '1h',
};

vi.mock('@/lib/auth/auth', () => ({
  auth: vi.fn(() => mockSession),
}));

export { mockSession };
