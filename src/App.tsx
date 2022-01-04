// import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import "./App.css";
import { UnauthticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  console.log("App.user", user);
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>{user ? <AuthenticatedApp /> : <UnauthticatedApp />}</ErrorBoundary>
    </div>
  );
}

export default App;
