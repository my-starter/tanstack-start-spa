export const isDev = import.meta.env.MODE === 'development';
export const isProd = import.meta.env.MODE === 'production';
export const isBrowser = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';
