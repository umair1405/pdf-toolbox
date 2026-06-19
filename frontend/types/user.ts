export interface User {
  id: string;
  email: string;
  full_name: string | null;
  plan: "free" | "pro" | "team";
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  full_name?: string;
}
