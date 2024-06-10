import { Request, Response } from 'express';
import {  CategoryDocument, Category}  from '../models/category.model';
import { CategoryProps }  from '../interface/category/category';

export const createCategory = async (req: Request<any, any, CategoryProps, any>, res: Response<any>) => {
  try {
    const categoryData: CategoryProps = req.body;

    const newcategory: CategoryDocument = new Category({     
      ...categoryData,
   

    });

    await newcategory.save();

    res.status(201).json({ message: 'Category envoyé avec succès !' });
  } catch (error:any) {
    console.error('Erreur lors de l\'envoi de la category:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des catégories:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

