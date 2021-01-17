/**
 * Stripe HTTP API Wrapper
 */
import axios from 'axios';
import Constants from 'expo-constants';

import { CreatePaymentMethodPayload } from '../types/payments/create-payment-method-payload';

const qs = require('qs');

/**
 * Create HTTP client used for all Stripe related requests
 */
const stripeClient = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `Bearer ${Constants.manifest.extra.stripe.publicKey}`,
  },
});

/**
 * Create new payment method using Stripe API
 * @param payload - credit card details
 * @return Promise<Stripe.PaymentMethod> - Stripe API response
 */
const createPaymentMethod = (payload: CreatePaymentMethodPayload) =>
  stripeClient.post<Stripe.PaymentMethod>(
    '/payment_methods',
    qs.stringify(payload)
  );

export const Stripe = {
  createPaymentMethod,
};
