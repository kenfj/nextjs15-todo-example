// https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o#why-mock-prisma-client

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
