import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserProps } from '../interface/auth/user';



// Interface décrivant un document utilisateur dans MongoDB, étendant les propriétés d'utilisateur et Document de Mongoose
export interface UserDocument extends UserProps, Document {}


// Interface décrivant le modèle utilisateur, étendant le modèle de Mongoose avec le type UserDocument
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
