import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.user?.role === 'admin') { 
      return next();
    } else {
      res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
  };
