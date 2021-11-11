import { useEffect, useState } from "react";

export const isFalse = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!value) {
      delete result[key];
    }
  });
  return result;
};
// 在页面刚进来的时候执行一次
export const useMount = (callback) => {
  // 函数名改为mount eslint会报错,hook只能在组件或者其他hook内运行,custom hook都为use开头
  useEffect(() => {
    callback && callback();
  });
};

export const debounce = (func, delay) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value); // 设置一个state

  useEffect(() => {
    // 每次在value变化以后,设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
