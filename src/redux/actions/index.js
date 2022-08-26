export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CHANGE_WALLET = 'CHANGE_WALLET';

export const changeEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

export const changeWallet = (value) => ({
  type: CHANGE_WALLET,
  value,
});
