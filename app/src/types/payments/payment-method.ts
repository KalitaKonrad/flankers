// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare module Stripe {
  export interface Address {
    city?: any;
    country?: any;
    line1?: any;
    line2?: any;
    postal_code: string;
    state?: any;
  }

  export interface BillingDetails {
    address: Address;
    email: string;
    name?: any;
    phone: string;
  }

  export interface Checks {
    address_line1_check?: any;
    address_postal_code_check?: any;
    cvc_check: string;
  }

  export interface Networks {
    available: string[];
    preferred?: any;
  }

  export interface ThreeDSecureUsage {
    supported: boolean;
  }

  export interface Card {
    brand: string;
    checks: Checks;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from?: any;
    last4: string;
    networks: Networks;
    three_d_secure_usage: ThreeDSecureUsage;
    wallet?: any;
  }

  export interface Metadata {
    order_id: string;
  }

  export interface PaymentMethod {
    id: string;
    object: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer?: any;
    livemode: boolean;
    metadata: Metadata;
    type: string;
  }
}
