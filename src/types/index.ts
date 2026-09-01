export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginFormState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}
