// config/db.config.js
import mongoose from 'mongoose';

// Clé secrète pour JWT
export const secretKey:string = 'votre_clé_secrète';

//Connexion à la base de données 
const connectDB = async () => {
  try {
    const uri:string ="mongodb+srv://root:root@cluster0.xpnry5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(uri);
    console.log('Connexion à la base de données établie');
  } catch (error:any) {
    console.error('Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
};

export default connectDB;
