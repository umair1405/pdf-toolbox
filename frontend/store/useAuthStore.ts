import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
