import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import  { UserDocument, User } from '../models/user.model'; // Import de UserDocument depuis le fichier user.model.ts
import { secretKey } from '../../config/db.config';
import { UserProps } from '../interface/user'; 
import { JwtData } from '../interface/jwt'; 
import { RegisterResponse} from '../interface/register'; 
import { UserCredentials} from '../interface/userCredentials'; 
import { AuthenticatedRequest } from '../interface/authRequest';




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
const loginUser = async (req: Request<any, any, any, any>, res: Response<RegisterResponse>) => {
  try {

    const credentials: UserCredentials = req.body;

    const user: UserDocument | null = await User.findOne({email: credentials.email });

    if (!user) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
    }

    const tokenData: JwtData = { email: user.email, userId: user._id };
    const token: string = generateToken(tokenData);

    const response: RegisterResponse = { message: 'Connexion réussie', token };
    res.json(response);
  } catch (error:any) {
    console.error('Erreur lors de la connexion:', error.message);
    res.status(500).send({message:'Erreur serveur'});
  }
};

// Controller Deconnexion 
const logoutUser = async (req: Request<{}, {}, {}, {}>, res: Response<any>) => {
  try {
    res.json({ message: 'Déconnexion réussie' });
  } catch (error:any) {
    console.error('Erreur lors de la déconnexion:', error.message);
    res.status(500).send('Erreur serveur');
  }
};

// Controller Suppresion Compte
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: string = (req as AuthenticatedRequest).user.userId; // Utilisez l'interface AuthenticatedRequest ici
    await User.findByIdAndDelete(userId);
    res.json({ message: 'Compte supprimé avec succès.' });
  } catch (error:any) {
    console.error('Erreur lors de la suppression du compte:', error.message);
    res.status(500).send('Erreur serveur');
  }
};


export { registerUser, loginUser, logoutUser, deleteUser };