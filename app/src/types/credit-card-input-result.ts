type CreditCardInputStatus = 'incomplete' | 'invalid' | 'valid';

export interface CreditCardInputResult {
  valid: boolean;
  values: {
    number: string;
    expiry: string;
    cvc: string;
    type:
      | null
      | 'visa'
      | 'master-card'
      | 'american-express'
      | 'diners-club'
      | 'discover'
      | 'jcb'
      | 'unionpay'
      | 'maestro';
    name: string;
    postalCode: string;
  };
  status: {
    number: CreditCardInputStatus;
    expiry: CreditCardInputStatus;
    cvc: CreditCardInputStatus;
    name: CreditCardInputStatus;
    postalCode: CreditCardInputStatus;
  };
}
