import { Request, Response, NextFunction } from 'express';
import { ProjetProps } from '../interface/projet/projet';
import fs from 'fs';

export const validateProjetData = (req: Request, res: Response, next: NextFunction) => {
  const projectData: ProjetProps = req.body;

  // Vérifiez que toutes les données nécessaires sont présentes
  if (!projectData.title || !projectData.description || !projectData.explanation || !projectData.category || !req.file) {
    if (req.file) {
      //Supprimez l'image téléchargée en cas d'erreur
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
        }
      });
    }
    return res.status(400).json({ message: 'Toutes les données du projet sont requises' });
  }
  projectData.image = req.file.path;


  next();
};
