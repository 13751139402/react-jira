import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
// useSearchParams:一个方便的包装器，通过URLSearchParams接口读取和写入搜索参数。

// 返回页面url中,指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams] // 只有当searchParams改变后才重新计算其值
    ),
    setSearchParam,
  ] as const; // const是必须的，否则ts会诡异起来
};
// ======================================================================
// ts认为数组的每一项类型都是一样的，所以这里的类型是:
// const a: (string | number | {
//     gender: string;
// })[]
// const a = ["jack", 12, { gender: "male" }];
// 在后面添加as const就是来解决这个问题的
