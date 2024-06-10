import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';



// Configuration de multer pour le stockage des fichiers téléchargés
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'src/uploads';

    fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) {
          // Gérer l'erreur, si nécessaire
          console.error('Erreur lors de la création du dossier :', err);
        } else {
          cb(null, uploadDir);
        }
      }); 
  },
  
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${extension}`);
  }
});


// Fonction de filtrage des types de fichiers autorisés
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['.png', '.jpg', '.jpeg', '.svg'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non pris en charge. Seuls les fichiers PNG, JPG, JPEG et SVG sont autorisés.'));
  }
};


// Configuration de multer avec les options de stockage et de filtrage
const upload: Multer = multer({ 
  storage, 
  fileFilter 
});

export default upload;
