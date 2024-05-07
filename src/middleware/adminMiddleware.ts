import { Request, Response, NextFunction } from 'express';
import  { UserDocument, User } from '../models/user.model'; // Import de UserDocument depuis le fichier user.model.ts

export const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    // Obtenez l'ID de l'utilisateur à partir du JWT vérifié
    const userId: string = req.user.userId;

    // Recherchez l'utilisateur dans la base de données en utilisant le modèle
    const user: UserDocument | null = await User.findById(userId);

    // Vérifiez si l'utilisateur est administrateur
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas administrateur." });
    }

    // Si l'utilisateur est administrateur, passez à la prochaine étape
    next();
  } catch (error:any) {
    console.error('Erreur lors de la vérification du statut admin :', error.message);
    res.status(500).send('Erreur serveur');
  }
};


