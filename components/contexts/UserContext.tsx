import { createContext } from "react";

export interface UserContextInfo {
  
}

const UserContext = createContext<UserContextInfo | undefined>({})
