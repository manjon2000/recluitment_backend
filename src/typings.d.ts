import { IJWTUserData } from './common/interfaces/jwt.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IJWTUserData;
    }
  }
}
