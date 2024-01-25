import { getAuth } from 'firebase-admin/auth';
import { app } from './init';

export const auth = getAuth(app);
