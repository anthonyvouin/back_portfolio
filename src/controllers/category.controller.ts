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

export const updateCategoryById = async (req: Request<{ id: string }, any, CategoryProps, any>, res: Response) => {
  try {
    const { id } = req.params;
    const categoryData: CategoryProps = req.body;

    const updatedCategory: CategoryDocument | null = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.status(200).json({ message: 'Catégorie mise à jour avec succès', updatedCategory });
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error.message);
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

export const deleteCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category non trouvée' });
    }

    res.status(200).json({ message: 'Category supprimée avec succès' });
  } catch (error: any) {
    
    console.error('Erreur lors de la suppression de la catégorie:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};