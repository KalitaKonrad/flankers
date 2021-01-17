export interface CreatePaymentMethodPayload {
  type: string;
  card: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
  };
}
