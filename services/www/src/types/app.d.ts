import { User } from "firebase/auth"

export interface AppContext {
  firebase: {
    user: User | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };
}
