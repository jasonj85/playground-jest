export interface CredentialsState {
  username: string;
  password: string;
  isLoggedIn: boolean;
  loginAttempted: boolean;
}

export interface CustomEvent {
  target: HTMLInputElement;
}
