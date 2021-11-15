import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-pannel";
interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: (form: AuthForm) => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // 函数式编程 消参
  // 原代码 const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  console.log("useAuth.context", context);

  return context;
};
