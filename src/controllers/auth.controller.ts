import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import  { UserDocument, User } from '../models/user.model'; // Import de UserDocument depuis le fichier user.model.ts
import { secretKey } from '../../config/db.config';
import { UserProps } from '../interface/user'; 
import { JwtData } from '../interface/jwt'; 
import { RegisterResponse} from '../interface/register'; 


// Fonction pour générer le token JWT
const generateToken = (userData: JwtData): string => {
  return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};


// Controller inscription 
const registerUser = async (req: Request<any, any, UserProps, any>, res: Response<RegisterResponse>) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser: UserDocument | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Un compte avec cette adresse e-mail existe déjà.' });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: UserDocument = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: false, // Ajout d'isAdmin à false par défaut
    });

    await newUser.save();

    const token: string = generateToken({ email: newUser.email, userId: newUser._id });

    const response: RegisterResponse = { message: 'Compte créé avec succès !', token };
    res.json(response);
  } catch (error:any) {
    console.error('Erreur lors de la création du compte:', error.message);
    res.status(500).send({message:'Erreur serveur'});
  }
};

// Controller Connexion

export default{ registerUser };