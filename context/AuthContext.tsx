import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {
  user?: User;
  setUser: (user?: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    user?: User;
  }>();

  const setUser = (user?: User) => {
    setState({ user });
  };

  return (
    <AuthContext.Provider value={{ user: state?.user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
