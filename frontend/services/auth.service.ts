import { api } from "@/services/api";
import type { LoginPayload, RegisterPayload, TokenPair, User } from "@/types/user";

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post<User>("/auth/register", payload).then((r) => r.data),

  login: (payload: LoginPayload) =>
    api.post<TokenPair>("/auth/login", payload).then((r) => r.data),

  refresh: (refreshToken: string) =>
    api.post<TokenPair>("/auth/refresh", { refresh_token: refreshToken }).then((r) => r.data),
};
