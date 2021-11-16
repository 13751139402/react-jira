import React from "react";
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 当React渲染一个订阅了这个Context对象的组件,这个组件会从组件树中离自身最近的那个匹配的Provider中读取到当前的context值
// 为当前的 theme 创建一个 context（“light”为默认值），Provider不传值时生效
const ThemeContext = React.createContext("light");

export class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
ThemeContext.displayName = "dddd";
// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function Button() {
  const context = React.useContext(ThemeContext);
  console.log("Button", context);

  return <div>{context}</div>;
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button />;
  }
}
