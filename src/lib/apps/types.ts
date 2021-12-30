export type TokenRequest<T extends {}> = T & {
  token: string;
};
