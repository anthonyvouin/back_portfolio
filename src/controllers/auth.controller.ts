import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import  { UserDocument, User } from '../models/user.model'; // Import de UserDocument depuis le fichier user.model.ts
import { secretKey } from '../../config/db.config';
import { UserProps, UserCredential} from '../interface/auth/user'; 
import { GenerateToken } from '../interface/jwt/jwtGenerate'; 
import { RegisterResponse} from '../interface/response/register'; 



// Fonction pour générer le token JWT
const generateToken = (userData: GenerateToken): string => {
  return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};


// Controller inscription 
const registerUser = async (req: Request<any, any, UserProps, any>, res: Response<RegisterResponse>) => {
  try {
    const userData: UserProps = req.body;

    const existingUser: UserDocument | null = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json({ message: 'Un compte avec cette adresse e-mail existe déjà.' });
    }

    const hashedPassword: string = await bcrypt.hash(userData.password, 10);

    const newUser: UserDocument = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      isAdmin: false,
    });

    await newUser.save();

    const token: string = generateToken({ email: newUser.email, userId: newUser._id });

    const response: RegisterResponse = { message: 'Compte créé avec succès !', token };
    res.json(response);
  } catch (error:any) {
    console.error('Erreur lors de la création du compte:', error.message);
    res.status(500).send({ message: 'Erreur serveur' });
  }
};

// Controller Connexion
const loginUser = async (req: Request<any, any, any, any>, res: Response<RegisterResponse>) => {
  try {

    const credentials: UserCredential = req.body;

    const user: UserDocument | null = await User.findOne({email: credentials.email });

    if (!user) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
    }

    const tokenData: GenerateToken = { email: user.email, userId: user._id };
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

// Controller suppression du compte
const deleteUser = async (req: any, res: Response<any>) => {
  try {
    // Obtenez l'ID de l'utilisateur à partir du JWT vérifié
    const userId:string = req.user.userId;

    // Supprimez l'utilisateur de la base de données
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Compte supprimé avec succès.' });
  } catch (error:any) {
    console.error('Erreur lors de la suppression du compte:', error.message);
    res.status(500).send('Erreur serveur');
  }

};

// Controller de mise à jour des informations du compte


export { registerUser, loginUser, logoutUser, deleteUser };