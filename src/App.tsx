// import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import "./App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React from "react";

// 代码分割/懒加载，只有当React组件使用到代码时，再去请求代码并注册为React组件
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* 当懒加载去请求页面时候，先用Suspense兜底·展示一下 */}
        <React.Suspense fallback={<FullPageLoading></FullPageLoading>}>
          {user ? <AuthenticatedApp /> : <UnauthticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
