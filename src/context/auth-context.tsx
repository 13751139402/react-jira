import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-pannel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading, FullPageErrorFallback } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
export interface AuthForm {
  username: string;
  password: string;
}
// bootstrap是初始化的意思
export const bootstrapUser = async () => {
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

// children就是Vue中的slot
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, isIdle, run, setData: setUser, isError, error } = useAsync<User | null>(undefined, { throwOnError: true });
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  // 返回当前的context值
  // 定义dispatch触发logout,ts显示声明,返回一个promise,参数类型不重要
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
