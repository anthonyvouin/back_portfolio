import { Request, Response } from 'express';
import { Projet } from '../models/projet.model';
import { ProjetProps } from '../interface/projet/projet';


export const createProjet = async (req: Request<any, any, ProjetProps, any>, res: Response<any>) => {
  try {
    const projectData: ProjetProps = req.body;

    
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











