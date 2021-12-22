import React, { useEffect, useState } from "react";
// import { useMount } from "utils";

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num值:${num}`;
    return function unmount() {
      console.log(message, num);
    };
  };
  return effect;
};
// 执行test,返回effect函数
const add = test();
// 执行effect函数,返回引用了message1的unmount函数
const unmount = add();
// 再一次执行effect函数，返回引用了message2的unmount函数
add();
// message3
add();
// 执行了3次effect，形成了3个effect闭包，每个闭包都有message变量，分别是1，2，3。所以unmount打印的是与之对应的1
// 但是变量num是test闭包的，所以会打印3
unmount(); // 现在的num值:1，3

// react hook与闭包经典的坑
// 每次页面渲染的时候都会执行Test形成新的闭包,页面mount的时候会执行useMount和useEffect
// 所以useMount和useEffect使用的一直是初次闭包的值,一直打印0
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  //   // 遇到闭包问题也不能用useMount,得使用useEffect
  //   useMount(() => {
  //     setInterval(() => {
  //       console.log("num in setInterval:", num); // 一直打印0
  //     }, 1000);
  //   });
  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval:", num); // 一直打印0
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("函数卸载时num:", num);
    };
  }, [num]);
  // 空数组警告：React Hook useEffect has a missing dependency: 'num'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  // 这里已经给出了解决方案，在[]数组中添加num,会在state num值改变时更新内部值并执行useEffect
  // 或者去除数组，此时任一state更改都会更新内部值并执行useEffect
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number:{num}</p>
    </div>
  );
};
