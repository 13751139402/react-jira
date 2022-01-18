import { act, renderHook } from "@testing-library/react-hooks";
import { useAsync } from "utils/use-async";

// defaultState模拟useAsync的返回值
const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  // 在测试中这些函数不重要，所以随便给了函数用来过路
  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isLoading: false,
  isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
  let resolve: any;
  const promise = new Promise((res) => {
    resolve = res;
  });
  // renderHook渲染一个hook
  const { result } = renderHook(() => useAsync());
  // result.current是Hook返回的值
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  // 因为setState是异步的，如果想安全的获取setState改变之后的值，就得用act包裹起来
  act(() => {
    // 跑一下useAsync的run方法
    p = result.current.run(promise);
  });
  // 测量loadingState
  expect(result.current).toEqual(loadingState);
  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    resolve(resolvedValue);
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
