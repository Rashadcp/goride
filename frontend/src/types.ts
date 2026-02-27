export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "USER" | "DRIVER";
}

export interface LoginData {
  email: string;
  password: string;
}