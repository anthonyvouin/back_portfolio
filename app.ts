import  express ,{ Request, Response, Express } from 'express';
import cors from 'cors'; 
import testRoute from './src/routes/test';
import authRoute from './src/routes/auth';
import adminRoute from './src/routes/admin';
import contactRoute from './src/routes/contact';
import categoryRoute from './src/routes/category';
import projetRoute from './src/routes/projet';
import connectDB from './src/config/db.config';


// Serveur
const app: Express = express();
const port:number = 3000;

// Connexion à la base de données
connectDB()

// Options CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Utilisation de express json pour parser le corps des requêtes en JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques du dossier 'uploads'
app.use("/src/uploads", express.static("src/uploads"));

//Appel route
app.use('/test', testRoute );
app.use('/auth', authRoute);
app.use('/admin', adminRoute)
app.use('/contact', contactRoute)
app.use('/category', categoryRoute)
app.use('/projet', projetRoute )



app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
