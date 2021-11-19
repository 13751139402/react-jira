import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
export const LoginScreen = () => {
  const { login } = useAuth(); // 组件向上找到最近的provider是否为AuthContext,是则拿到context值user, login
  const handleSubmit = (values: { username: string; password: string }) => {
    // login会调用setUser,改变user值后会重新渲染页面,就会重新执行LoginScreen,结果就是user的更新同步于视图
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
