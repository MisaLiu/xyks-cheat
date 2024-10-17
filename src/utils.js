
export const sleep = (ms) => new Promise((res) => setTimeout(() => res(true), ms));