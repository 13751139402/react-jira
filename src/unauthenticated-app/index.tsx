import { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Card } from "antd";
export const UnauthticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <button onClick={() => setIsRegister(!isRegister)}>切换{isRegister ? "登录" : "注册"}</button>
      </Card>
    </div>
  );
};
