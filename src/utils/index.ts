/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const isFalse = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (!value) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
// 在页面刚进来的时候执行一次
// state改变=》页面更新=》触发所有的effect销毁函数=》触发所有的effect函数
export const useMount = (callback: () => void) => {
  // 函数名改为mount eslint会报错,hook只能在组件或者其他hook内运行,custom hook都为use开头
  useEffect(() => {
    callback && callback();
  }, []); // []表示useEffect只在组件初始化时执行一次,组件销毁时执行销毁函数.[]内有参数，则当参数改变时才触发effect
};

export const debounce = (func: () => {}, delay: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value); // 设置一个state

  useEffect(() => {
    // 每次在value变化以后,设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const newList = [...value];
    newList.splice(index, 1);
    setValue(newList);
  };
  const add = (item: T) => {
    setValue([item, ...value]);
  };
  return {
    clear,
    removeIndex,
    add,
    value: value,
  };
};
