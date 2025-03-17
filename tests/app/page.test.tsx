import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Home from '@/app/page';

import { mockSession } from '../fixtures/setup-mocks';

const mock_auth = vi.hoisted(() => ({
  auth: vi.fn()
}))

vi.mock("@/lib/auth/auth", () => ({
  auth: mock_auth.auth,
}))

describe('Home Component', () => {
  test('renders Home before login', async () => {
    vi.mocked(mock_auth.auth).mockReturnValue(undefined)

    // https://azukiazusa.dev/blog/server-components-testing/
    render(await Home());

    const h1 = screen.getByRole('heading', { level: 1, name: 'Welcome to the Todo App' })
    expect(h1).toBeDefined()
  });

  test('renders Home after login', async () => {
    vi.mocked(mock_auth.auth).mockReturnValue(mockSession)

    // https://todayilearned.au/rants/how-to-test-next-js-app-router
    await expect(() => Home()).rejects.toThrowError("NEXT_REDIRECT");

    try {
      await Home();
    } catch (e: unknown) {
      expect(e).toMatchObject({
        "message": "NEXT_REDIRECT",
        "digest": "NEXT_REDIRECT;replace;/todos;307;",
      });
    }
  });
});
