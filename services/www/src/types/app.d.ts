import { User } from "firebase/auth"

export interface AppContext {
  firebase: {
    user: User | null;
    userHash: string | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
    reloadUser: () => void;
  };
}
