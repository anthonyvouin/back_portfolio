import mongoose, { Document, Schema, Model } from 'mongoose';
import { ProjetProps } from '../interface/projet/projet'
import {  Category}  from '../models/category.model';


// Interface décrivant le document projet, étendant le modèle de Mongoose avec le type ProjectDocument
export interface ProjetDocument extends ProjetProps, Document {}
interface ProjetModel extends Model<ProjetDocument> {}

// Schéma du projet
const projectSchema = new Schema<ProjetDocument, ProjetModel>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    explanation: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Référence à l'ID de la catégorie
    image : { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Modèle projet
const Projet = mongoose.model<ProjetDocument, ProjetModel>('Project', projectSchema);

export { Projet, ProjetModel };