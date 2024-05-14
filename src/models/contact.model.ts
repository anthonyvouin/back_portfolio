import mongoose, { Document, Schema, Model } from 'mongoose';
import { ContactProps } from '../interface/contact/contact'


export interface ContactDocument extends ContactProps, Document {}
// Interface décrivant le modèle contact, étendant le modèle de Mongoose avec le type ContactDocument
interface ContactModel extends Model<ContactDocument> {}

// Schéma du contact
const contactSchema = new Schema<ContactDocument, ContactModel>({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true }, 
    objet: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now } 
});

// Modèle contact
const Contact = mongoose.model<ContactDocument, ContactModel>('Contact', contactSchema);

export { Contact, ContactModel };
