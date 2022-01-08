import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-pannel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading, FullPageErrorFallback } from "components/lib";
import { useQueryClient } from "react-query";
interface AuthForm {
  username: string;
  password: string;
}
// bootstrap是初始化的意思
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
    return user;
  }
};

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

export const useAuth = () => {
  // 返回当前的context值
  const context = React.useContext(AuthContext);
  if (!context) {
    // 获取不到context是因为不在Provider的children中使用,组件向上找不到订阅的context
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

// children就是Vue中的slot
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, isIdle, run, setData: setUser, isError, error } = useAsync<User | null>(undefined, { throwOnError: true });
  const queryClient = useQueryClient();
  // 函数式编程 消参
  // 原代码 const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear(); // 退出登录时把所有react-query获取的数据都清除掉
    });

  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }
  // 挂载Provider时传入value和children
  // 当children组件使用login,register和logout时会触发setUser,改变user值重新渲染页面
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
