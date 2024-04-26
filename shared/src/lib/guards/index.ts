export * from "./auth.guard"

declare global {
  namespace Express {
    export interface Request {
      user: string
    }
  }
}
