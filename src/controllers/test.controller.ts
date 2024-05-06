import { Request, Response } from 'express';


const testController = (req: Request, res: Response):void => {
    res.json({ message: "Coucou, je suis un test!" });
  };

export default  testController ;
