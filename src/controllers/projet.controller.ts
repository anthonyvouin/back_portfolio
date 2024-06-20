import { Request, Response } from 'express';
import { Projet } from '../models/projet.model';
import { ProjetProps } from '../interface/projet/projet';
import {  Category}  from '../models/category.model';
import { RegisterResponse} from '../interface/response/register'; 
import mongoose from 'mongoose';


export const createProjet = async (req: Request<any, any, ProjetProps, any>, res: Response<any>) => {
  try {
    const projectData: ProjetProps = req.body;


       // Vérifiez que l'ID de la catégorie est valide
       if (!mongoose.Types.ObjectId.isValid(projectData.category)) {
        return res.status(400).json({ message: 'ID de catégorie invalide' });
      }
  
      const categoryExists = await Category.exists({ _id: projectData.category });
      if (!categoryExists) {
        return res.status(400).json({ message: 'Catégorie non trouvée' });
      }

    if (req.file) {
      projectData.image = req.file.path
    }
    
    const newProject = new Projet({
      ...projectData,
      date: projectData.date,
    });

    await newProject.save();

    res.status(201).json({ message: 'Projet créé avec succès !' });
  } catch (error:any) {
    console.error('Erreur lors de la création du projet:', error.message);    
    res.status(500).json({ message: 'Erreur serveur' });
     
  }
};

export const getAllProjets = async (req: Request, res: Response) => {
  try {
    const projets = await Projet.find().populate('category', 'name') 

    res.status(200).json(projets); 
  } catch (error: any) {
    console.error('Erreur lors de la récupération des projets :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};











