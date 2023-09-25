export interface User {
  user_id: string,
  user_name: string,
  name_:string,
  surname_: string,
  password_: string,
  email_: string,
  phone_number: string,
  birth_date: string
}

export interface RegisterUser {
  User: {
    avatar: string,
    userId: string,
    lastLogin: string,
    accountStatus: number,
    language: string,
    activeDashboards: any[],
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    domain: string,
    token: string
  },
  Roles: string[],
  Groups: string[]
}
