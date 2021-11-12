```
const LoginScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};
  return (
    <form onSubmit={handleSubmit}>
  );
};
```
下面的类型都可以在react.d.ts中找到
# <form>
tsx文件会被babel解析，这行代码会变成一个对象,并且自动带上ts类型**DOMAttributes** DOMAttributes<HTMLFormElement> 且HTMLFormElement作为泛型传入

# onSubmit={handleSubmit}
DOMAttributes<HTMLFormElement> interface有onSubmit属性的类型**FormEventHandler<HTMLFormElement>**
`type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;`
FormEventHandler约束了T的默认泛型为Element或者其中子类

# EventHandler<FormEvent<HTMLFormElement>> 先拆分看FormEvent<HTMLFormElement>
`interface FormEvent<T = Element> extends SyntheticEvent<T> {}`
FormEvent继承了SyntheticEvent,所以下一步就是SyntheticEvent<T> Synthetic是合成的意思

## SyntheticEvent<HTMLFormElement>
`interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}`
此时T为HTMLFormElement,E为默认泛型Event。继承了BaseSyntheticEvent 
EventTarget是事件元素,拥有addEventListener,removeEventListener,dispatchEvent属性
## BaseSyntheticEvent<Event,EventTarget&HTMLFormElement,EventTarget>
传入泛型之后的BaseSyntheticEvent
interface BaseSyntheticEvent<E = object, C = any, T = any> {
    nativeEvent: <Event>;
    currentTarget: <EventTarget&HTMLFormElement>;
    target: <EventTarget>;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
}
这就是事件函数的**event参数**,传入HTMLFormElement泛型是为了**约束currentTarget为事件元素**

# EventHandler<FormEvent<HTMLFormElement>> 回到EventHandler
`type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];`
事件函数规定了第一个泛型必须为SyntheticEvent或者子类(事件对象),且必须有一个泛型。
EventHandler简单的写法:(event:E)=>void
为何要用`{ bivarianceHack(event: E): void }["bivarianceHack"];`
https://www.coder.work/article/1309521

# 导出类型
`export as namespace React;`
这行代码可以将namespace的interface和type导出
使用时导入即可
`import React, { FormEvent } from "react";`

# 结论
在开发中只需要拿到`FormEvent<HTMLFormElement>`就能获得当前事件的事件对象类型
`const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};`





