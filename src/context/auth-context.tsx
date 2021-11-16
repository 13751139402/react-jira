import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-pannel";
interface AuthForm {
  username: string;
  password: string;
}

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// createContext会创建一个Context对象,对象中包含了Provider组件函数
// 当React渲染Provider,Provider内部的组件能拿到最近的Provider中的context值
// 传入的参数为默认值,当渲染Provider不穿value时生效
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; // React DevTools中的Provider名称

// children就是Vue中的slot
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // 创建一个响应式数据
  // 函数式编程 消参
  // 原代码 const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // 挂载Provider时传入value和children
  // 当children组件使用login,register和logout时会触发setUser,改变user值重新渲染页面
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  // 返回当前的context值
  const context = React.useContext(AuthContext);
  if (!context) {
    // 获取不到context是因为不在Provider的children中使用,组件向上找不到订阅的context
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
