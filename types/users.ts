export interface IRegisterUserData {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirm: string
}

export interface ILoginUserData {
  email: string
  password: string
}
