export interface LoginRequest {
  Username: string,
  Password: string,
}

export interface LoginResponse {
  messageId: number,
  result: boolean,
  message: User
}

export interface User {
  userId: string,
  lastLogin: string,
  accountStatus: number,
  language: string,
  activeDashboards: string[],
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  domain: string,
  token: string,
  avatar: string,
  groups?:string[]
}
