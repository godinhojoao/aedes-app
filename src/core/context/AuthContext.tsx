import { useState, createContext } from "react";
import { AsyncStorageManager } from "../shared/AsyncStorageManager";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState(null);
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
    account,
    setAccount,
    logout: async () => {
      await AsyncStorageManager.removeItem("aedes-token");
      await AsyncStorageManager.removeItem("aedes-account");
      setIsAuthenticated(false);
      setToken(null);
      setAccount(null);
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
