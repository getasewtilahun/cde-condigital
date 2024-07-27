export const TELEGRAM_API = (TOKEN: string) => `https://api.telegram.org/bot${TOKEN}`;

export const URI = (TOKEN: string) => `/webhook/${TOKEN}`;