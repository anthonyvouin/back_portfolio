import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import  { UserDocument, User } from '../models/user.model'; // Import de UserDocument depuis le fichier user.model.ts
import { secretKey } from '../../config/db.config';
import { UserProps, UserCredential, UserWithoutPwdandAdmin, UserPasswordOnly} from '../interface/auth/user'; 
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
const loginUser = async (req: Request<any, any, UserCredential, any>, res: Response<RegisterResponse>) => {
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
const logoutUser = async (req: any, res: Response<any>) => {
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
const updateUser = async (req: any, res: Response<any>) => {
  try {
    const updatedUserData: UserWithoutPwdandAdmin = req.body;
    const userId:string = req.user.userId;

     // Vérifier si l'e-mail est déjà utilisé par un autre utilisateur
    const isEmailTaken = await User.findOne({ email: updatedUserData.email, _id: { $ne: userId } });
     if (isEmailTaken) {
        return res.status(400).json({ message: 'Cette adresse e-mail est déjà utilisée par un autre utilisateur.' });
    }

    //mettre à jour les informations de l'utilisateur dans la base de données
    const data: UserDocument | null = await User.findByIdAndUpdate(
     userId,
     updatedUserData,      
     { new: true } // Pour renvoyer les données mises à jour

   
    );

    if (!data) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json( data );

  } catch (error:any) {
    console.error('Erreur lors de la mise à jour des informations du compte:', error.message);
    res.status(500).send('Erreur serveur');
  }

};

// Controller de mise à du mot de passe 
const updateUserPassword = async (req: any, res: Response<any>) => {
  try {
    const updatedUserData: UserPasswordOnly = req.body;
    const userId: string = req.user.userId;

    // Hash du nouveau mot de passe
    const hashedPassword:string = await bcrypt.hash( updatedUserData.password,10)

    // Mettre à jour le mot de passe de l'utilisateur en base données 
    const userPasswordUpdate = await User.findByIdAndUpdate(userId, { password: hashedPassword });

    
   if(userPasswordUpdate){
    res.status(200).send('Validé')

  }else{
    res.status(404).send('Utilisateur non trouvé')

  }

  } catch (error:any) {
    console.error('Erreur lors de la mise à jour des informations du compte:', error.message);
    res.status(500).send('Erreur serveur');
  }

};


export { registerUser, loginUser, logoutUser, deleteUser, updateUser, updateUserPassword };