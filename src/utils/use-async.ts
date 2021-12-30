import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./url";
// useCallback和useMemo都是为了处理引用类型的依赖存在的，限制为不要每次渲染时都重新创建
// 使用函数则用useCallback，对象使用useMemo

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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  // 判断组件是否在挂载状态中，只有挂载状态中才dispatch
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef]);
};

// run就是传入一个promise,控制loading,error等state。pormise返回的值会被data接受,setUser作为params来触发hook
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  // 什么时候用useReducer/useUndo
  // useReducer和useUndo功能上可以相互替换，useReducer适合定义相互影响的状态，useUndo适合单个状态
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState,
  });
  const safeDispactch = useSafeDispatch(dispatch);
  // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  // 惰性初始化会在页面mount时执行函数参数，把返回值当成State的值;在setRetry时也会执行函数参数
  // const [retry, setRetry] = useState(() => {});
  const [retry, setRetry] = useState(() => () => {});
  // let retry=()=>{} 不能这样写的原因是，每次页面渲染这个函数都会重复执行，所以let retry=()=>{}就会被覆盖，达不到保存promise的效果
  const setData = useCallback(
    (data: D) =>
      safeDispactch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispactch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispactch({
        data: null,
        stat: "error",
        error,
      }),
    [safeDispactch]
  );
  // run用来触发异步请求。每次页面渲染都会重新定义run,这里使用useCallback来包裹，当依赖项改变才重新定义run
  const run = useCallback(
    (promises: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promises || !promises.then) {
        throw new Error("请传入Promise类型数据");
      }
      // 因为setRetry传入函数是惰性加载,会直接执行run,run又setRetry。无限循环
      // setRetry(() => run(promises));
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDispactch({ stat: "loading" });
      return promises
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);

          if (config.throwOnError) {
            // catch会消化异常，如果不主动抛出，外面是接受不到异常的。得Promise.reject
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispactch] // 只有当依赖项被改变时才会重新定义
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // 当retry被调用时重新跑一遍run,让state刷新一遍
    retry,
    ...state,
  };
};
