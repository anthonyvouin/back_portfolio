// config/db.config.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Pour charger les variables depuis mon .env
dotenv.config();

// Clé secrète pour JWT
export const secretKey =  process.env.SECRET_KEY_JWT;


//Connexion à la base de données 
const connectDB = async () => {
  try {
    const uri:string | undefined  =process.env.MONGO_URI ;

    if (uri){ 
    await mongoose.connect(uri);
    console.log('Connexion à la base de données établie'); 
  }
  } catch (error:any) {
    console.error('Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
  
};

export default connectDB;
