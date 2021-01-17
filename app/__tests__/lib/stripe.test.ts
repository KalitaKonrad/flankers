import mockAxios from 'jest-mock-axios';

import { Stripe } from '../../src/lib/stripe';

const qs = require('qs');

describe('Stripe client', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should send request to stripe api with data passed as query string', async () => {
    const catchFn = jest.fn(),
      thenFn = jest.fn();

    const mockPayload = {
      card: {
        number: 'test',
        exp_year: 'test',
        exp_month: 'test',
        cvc: 'test',
      },
      type: 'card',
    };
    const mockQs = qs.stringify(mockPayload);

    Stripe.createPaymentMethod(mockPayload).then(thenFn).catch(catchFn);
    expect(mockAxios.post).toHaveBeenCalledWith('/payment_methods', mockQs);
  });
});
