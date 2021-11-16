import React from "react";
// import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import "./App.css";
import { UnauthticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthenticatedApp /> : <UnauthticatedApp />}</div>;
}

export default App;
