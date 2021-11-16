import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register, user } = useAuth(); // 组件向上找到最近的provider是否为AuthContext,是则拿到context值user, login
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log("提交", event.currentTarget);

    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    // login会调用setUser,改变user值后会重新渲染页面,就会重新执行LoginScreen,结果就是user的更新同步于视图
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
