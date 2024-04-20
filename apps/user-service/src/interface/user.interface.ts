
export interface GetUserByIdPayload {
  userId: string
}

export interface GetUserByEmailPayload {
  email: string
}

export interface ResultUser {
  userId: string
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  createdAt: string
}

export interface CreateUserPayload {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string

}
