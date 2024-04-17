export type CreateUserDTO = {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
}

export type UserSignInDTO = {
  username:string
  password:string
}
