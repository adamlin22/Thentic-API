import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiKey } from "../services/thentic";

const AppContext = createContext({
  loading: undefined,
  apiKey: undefined,
});

const AppProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    setApiKey(localStorage.getItem("thentic-api-key"));
  }, []);

  const requestApiKey = async () => {
    const receipt = await getApiKey();
    
    if (receipt) {
      setApiKey(receipt);
      localStorage.setItem("thentic-api-key", receipt);
      toast.success("Successfully generated!");
  
      return receipt;
    }
    
    return false;
  };

  return (
    <AppContext.Provider
      value={{
        apiKey,
        requestApiKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
