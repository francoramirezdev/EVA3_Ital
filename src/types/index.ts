export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
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
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  isRegistering: boolean;
}
