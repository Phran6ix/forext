import { Observable } from "rxjs"


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
export interface IUserService {
  GetUserByEmail(data:GetUserByEmailPayload): Observable<any>
  GetUserById(data:GetUserByIdPayload): Observable<any>
  CreateUser(data:CreateUserPayload): Observable<any>
}
