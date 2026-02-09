
import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({ 
    message: "Simple TS endpoint working", 
    timestamp: new Date().toISOString() 
  });
}
