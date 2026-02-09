
import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.status(200).json({ 
    version: '2.1', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
}
