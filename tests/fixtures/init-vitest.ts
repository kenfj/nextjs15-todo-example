import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  // init screen: https://stackoverflow.com/questions/76485245
  cleanup();

  // init mocks: https://github.com/vitest-dev/vitest/discussions/4328
  vi.resetAllMocks();
});
