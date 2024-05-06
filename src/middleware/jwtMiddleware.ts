// src/middleware/jwtMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secretKey } from '../../config/db.config';

import {  Response, NextFunction } from 'express';


// Fonction pour générer un token JWT
export const generateToken = (userData: any): string => {
  return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};


// Middleware pour la validation du token
export const jwtMiddleware = (req: any, res: Response, next: NextFunction):Response<any, Record<string, any>> | void => {
  // Récupérer le token depuis l'en-tête Authorization
  const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Token manquant, authentification requise.' });
  }

  try {
    // Vérifier le token
    const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide, authentification requise.' });
  }
};
