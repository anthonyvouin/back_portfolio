import mongoose, { Document, Schema, Model } from 'mongoose';
import { CategoryProps } from '../interface/category/category';

// Interface décrivant le document catégorie, étendant le modèle de Mongoose avec le type CategoryDocument
export interface CategoryDocument extends CategoryProps, Document {}
interface CategoryModel extends Model<CategoryDocument> {}

// Schéma de la catégorie
const categorySchema = new Schema<CategoryDocument, CategoryModel>({
    name: { type: String, required: true }
});

// Modèle catégorie
const Category = mongoose.model<CategoryDocument, CategoryModel>('Category', categorySchema);

export { Category, CategoryModel };
