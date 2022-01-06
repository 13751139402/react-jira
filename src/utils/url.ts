import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { cleanObject, subset } from "utils";
// useSearchParams:一个方便的包装器，通过URLSearchParams接口读取和写入搜索参数。

// 返回页面url中,指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    // 代理setSearchParam,约束URLSearch的属性只有keys数组内的
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const; // const是必须的，否则ts会诡异起来
};
// ======================================================================
// ts认为数组的每一项类型都是一样的，所以这里的类型是:
// const a: (string | number | {
//     gender: string;
// })[]
// const a = ["jack", 12, { gender: "male" }];
// 在后面添加as const就是来解决这个问题的

/*
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false;反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
