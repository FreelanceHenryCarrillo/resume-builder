

export interface IResultUser {
  token: string | null;
}



declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}