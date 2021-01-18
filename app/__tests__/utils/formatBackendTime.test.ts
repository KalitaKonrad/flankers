import { formatDate } from '../../src/utils/formatBackendTime';

describe('formatBackendTime', () => {
  it('returns correct format', () => {
    expect(formatDate('2021-01-31 10:12:14')).toBe('31/01/2021 10:12:14');
  });
});
