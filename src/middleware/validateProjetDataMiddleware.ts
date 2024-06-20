import { Request, Response, NextFunction } from 'express';
import { ProjetProps } from '../interface/projet/projet';
import fs from 'fs';
import {  Category}  from '../models/category.model';
import mongoose from 'mongoose';

export  const validateProjetData = async (req: Request<any, any, ProjetProps, any>, res: Response<any>, next: NextFunction) => {
  const projectData: ProjetProps = req.body;

  try{
  
    if (!projectData.title || !projectData.description || !projectData.explanation || !projectData.category || !req.file) {
      throw new Error('Toutes les données du projet sont requises');
    }

    // Vérifiez que l'ID de la catégorie est valide
    if (!mongoose.Types.ObjectId.isValid(projectData.category)) {
      throw new Error('ID de catégorie invalide');
    }

    // Vérifiez que la catégorie existe
    const categoryExists = await Category.exists({ _id: projectData.category });
    if (!categoryExists) {
      throw new Error('Catégorie non trouvée');
    }
    

  //Ajouter le chemin à l'image
  projectData.image = req.file.path;


  next();

} catch (error: any) {
  // Supprimez l'image téléchargée en cas d'erreur
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier :', err);
      }
    });
  }
  res.status(400).json({ message: error.message });
}
};
