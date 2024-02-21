export const ensurePathSlash = (str: string) => (!str || str.endsWith("/")) ? str : `${str}/`;
