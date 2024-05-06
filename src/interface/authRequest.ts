import { Request } from 'express';
import { JwtData } from './jwt';

export interface AuthenticatedRequest extends Request {
  user: JwtData; // Type de l'objet user dans le JWT
}
