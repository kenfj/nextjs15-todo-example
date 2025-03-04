import { PrismaClient } from '@prisma/client';
import { beforeEach, vi } from 'vitest';
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';

import prisma from '@/lib/prisma';

vi.mock("@/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export default prismaMock;
