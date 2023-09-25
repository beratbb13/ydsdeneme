import { User } from "./user";

export interface LoginRequest {
  Username: string,
  Password: string,
}

export interface LoginResponse {
  messageId: number,
  result: boolean,
  message: User
}


