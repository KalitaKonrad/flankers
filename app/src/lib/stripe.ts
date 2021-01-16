import axios from 'axios';
import Constants from 'expo-constants';

const qs = require('qs');

const stripeClient = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `Bearer ${Constants.manifest.extra.stripe.publicKey}`,
  },
});

const createPaymentMethod = (payload: CreatePaymentMethodPayload) =>
  stripeClient.post<Stripe.PaymentMethod>(
    '/payment_methods',
    qs.stringify(payload)
  );

export const Stripe = {
  createPaymentMethod,
};
