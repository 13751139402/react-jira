/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

export const isFalse = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
// ts的object类型包括对象和函数,函数是没有属性的,所以ts检测object判定为空对象
// 此时result[key]就等于在空对象中找属性,ts会判定报错
// let a: object;
// a = { name: "jack" };
// a = () => {};
// a = new RegExp("");

// let b:{[key:string]:unknown}
// b={name:'Jack'}
// b=()=>{}
// 在一个函数里,改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数（initialValue）
  // 返回的ref对象在组件的整个生命周期内保持不变
  // 组件mount时初始化后在整个生命周期内保持不变
  const oldTitle = useRef(document.title).current;
  console.log("oldTitle:", oldTitle);

  // 当title改变时更新document.title
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]); // 空数组的话返回函数会在组件卸载时触发
};
