import mongoose from 'mongoose';


export interface ProjetProps {

    title: string;
    description: string;
    explanation: string;
    category: mongoose.Types.ObjectId;  // Référence à l'ID de la catégorie
    image : string
    date?: Date;
}
