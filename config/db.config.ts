// config/db.config.js
import mongoose from 'mongoose';

// Clé secrète pour JWT
export const secretKey:string = 'votre_clé_secrète';

//Connexion à la base de données 
const connectDB = async () => {
  try {
    const uri:string ="mongodb+srv://avouin:8HMchxkcNPeqSpsR@portfolio.xhlxukc.mongodb.net/?retryWrites=true&w=majority&appName=portfolio";

    await mongoose.connect(uri);
    console.log('Connexion à la base de données établie');
  } catch (error:any) {
    console.error('Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
  
};

export default connectDB;
