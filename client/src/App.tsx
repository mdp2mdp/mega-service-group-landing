import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

// Get the base path from the current location
const getBasePath = () => {
  const path = window.location.pathname;
  // For GitHub Pages: /mega-service-group-landing/
  // For local: /
  if (path.includes('mega-service-group-landing')) {
    return '/mega-service-group-landing';
  }
  return '';
};

function AppRouter() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [basePath] = useState(getBasePath());

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router base={basePath}>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
