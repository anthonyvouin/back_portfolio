import { Request, Response } from 'express';


 const admin = (req: Request, res: Response):void => {
    res.json({ message: "Coucou, je suis un admin " });
  };

export default admin ;
