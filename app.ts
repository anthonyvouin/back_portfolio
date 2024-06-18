import  express ,{ Request, Response, Express } from 'express';
import cors from 'cors'; 
import testRoute from './src/routes/test';
import authRoute from './src/routes/auth';
import connectDB from './config/db.config';
import adminRoute from './src/routes/admin';
import contactRoute from './src/routes/contact';
import categoryRoute from './src/routes/category';
import projetRoute from './src/routes/projet';




// Serveur
const app: Express = express();
const port:number = 3000;

// Connexion à la base de données
connectDB()

// Utilisation de bodyParser pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors());

// Middleware pour servir les fichiers statiques du dossier 'uploads'
app.use("/src/uploads", express.static("src/uploads"));

//Appel route
app.use('/test', testRoute);
app.use('/auth', authRoute);
app.use('/admin', adminRoute)
app.use('/contact', contactRoute)
app.use('/category', categoryRoute)
app.use('/projet', projetRoute)


app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
