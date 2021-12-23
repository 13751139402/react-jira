// 有个错误边界的库来使用:https://github.com/bvaughn/react-error-boundary
// 这里先自己写一个。错误边界：页面渲染报错后如何处理
import React from "react";

// 错误边界只能用class来实现
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// React.Component两个泛型:1是组件的props 2是组件的state
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
  state = { error: null };

  // 当子组件抛出异常被ErrorBoundary捕获时，getDerivedStateFormError调用并返回值给state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
