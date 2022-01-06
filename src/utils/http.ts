import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (endpoint: String, { data, token, headers, ...customConfig }: Config = {}) => {
  console.log("httphttphttphttp");

  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    const query = qs.stringify(data);
    endpoint += query ? `?${qs.stringify(data)}` : "";
  } else {
    config.body = JSON.stringify(data || {});
  }
  console.log(`endpoint-data:${endpoint}`);
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // 没有权限,退出登录
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth(); // 发送接口时,从http中拿到user
  // Parameters会把http函数的参数数组的类型拿出来
  // useCallback在页面渲染时告诉react这个变量不需要重新声明，防止useEffect死循环
  type httpParams = Parameters<typeof http>;
  return useCallback((...[endpoint, config]: httpParams) => http(endpoint, { ...config, token: user?.token }), [user?.token]);
};
