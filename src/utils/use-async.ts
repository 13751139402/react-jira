import { useState } from "react";

// 管理接口请求的custom-hook
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success"; // 异步的四个状态
}

const defaultInitialState: State<null> = {
  // 默认state
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};
// run就是传入一个promise,控制loading,error等state。pormise返回的值会被data接受,setUser作为params来触发hook
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error,
    });
  // run用来触发异步请求
  const run = (promises: Promise<D>) => {
    if (!promises || !promises.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promises
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);

        if (config.throwOnError) {
          console.log("config.throwOnErrorconfig被触发");

          // catch会消化异常，如果不主动抛出，外面是接受不到异常的。得Promise.reject
          return Promise.reject(error);
        }
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
