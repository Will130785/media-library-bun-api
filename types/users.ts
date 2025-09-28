export interface IRegisterUserData {
  firstname: string
  lastname: string
  email: string
  password: string
  passwordConfirm: string
}

export interface ILoginUserData {
  email: string
  password: string
}
