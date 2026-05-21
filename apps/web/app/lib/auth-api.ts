import { request } from "./fetcher";

export const authApi = {
  signOut: () =>
    request<void>("/auth/sign-out", {
      method: "POST",
      body: {},
      parseAs: "void",
    }),
};
