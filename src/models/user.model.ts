import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserProps } from '../interface/user';
// Interface décrivant les propriétés d'un utilisateur


// Interface décrivant un document utilisateur dans MongoDB
export interface UserDocument extends UserProps, Document {}

// Interface décrivant le modèle utilisateur
interface UserModel extends Model<UserDocument> {}

// Schéma de l'utilisateur
const userSchema = new Schema<UserDocument, UserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  isAdmin: { type: Boolean, default: false },
});

// Modèle utilisateur
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export  {User, UserModel };
