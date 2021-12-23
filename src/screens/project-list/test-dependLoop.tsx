import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  // state和object的触发effect区别:
  // 1.state只有在set函数改变之后才会触发effect
  // 2.object对比前后地址不相同则触发effect
  //   const obj = 1; // 如果依赖为基础数据类型则不循环触发Effect
  const obj = { name: 1 };
  const [num, setNum] = useState(0);
  // 无限循环的逻辑:
  // 1.初次渲染时会调用setNum,setNum触发页面渲染函数App
  // 2.useEffect对比新旧obj,发现不是两个相同的函数，调用Effect
  // 3.又触发setNum=》渲染函数，进入下一个循环
  useEffect(() => {
    setNum(num + 1);
    // 基本类型，可以放在依赖里；组件状态，可以放在依赖里； 非组件状态的对象，绝不可以放到依赖里
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  // 解决方案：useMemo
  return (
    <div className="App">
      {num}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
