import { Request } from "express"

export interface JwtRequest extends Request {
    email: string,
    userId: string,
    iat: number,
    exp:number
  }
  