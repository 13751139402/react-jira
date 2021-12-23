import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";
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
    // 代理setSearchParam,约束URLSearch的属性只有keys数组内的
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator遍历器
      // Object.fromEntries() 方法把键值对列表转换为一个对象,需要传入一个iterable对象（就是带有iterator可遍历的对象）
      // searchParams返回的是一个URLSearchParams对象，需要用get方法才能获取值，这里直接用Object.fromEntries转化为普通对象
      // 再通过cleanObject清空多余的值，只保留params属性
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
      return setSearchParam(o);
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
