export const generateSuccessProbability = () => Math.floor(Math.random() * 51) + 50;

export const generateConfirmationCode = () => `CONFIRM-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;

export const getRandomCodename = () => {
  const codenames = ["The Nightingale", "The Kraken", "Ghost Fox", "Phantom Hawk"];
  return codenames[Math.floor(Math.random() * codenames.length)];
};