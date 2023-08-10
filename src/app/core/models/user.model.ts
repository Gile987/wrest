export interface User {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  nickname: string;
  isAdmin?: boolean;
}