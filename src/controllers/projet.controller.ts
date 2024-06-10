import { Request, Response } from 'express';
import { Projet } from '../models/projet.model';
import { ProjetProps } from '../interface/projet/projet';
import {  Category}  from '../models/category.model';


export const createProjet = async (req: Request, res: Response) => {
  try {
    const projectData: ProjetProps = req.body;

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













