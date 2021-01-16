export enum WalletChargeSource {
  GENERIC = 'generic',
  GAME_WON = 'game_won',
  GAME_LOST = 'game_lost',
  PURCHASE = 'purchase',
}

export interface WalletCharge {
  amount: string;
  source: WalletChargeSource;
  wallet_id: number;
  created_at: Date;
}

export interface Wallet {
  balance: number;
  created_at: Date;
  id: number;
  owner_id: string;
  updated_at: Date;
  charges: WalletCharge[];
}
