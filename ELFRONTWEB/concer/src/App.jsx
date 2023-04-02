import React from "react";
import AuthContext from "./modules/auth/AuthContext";
import AuthState from "./modules/auth/AuthState";
import { Login } from "./modules/auth/Login";
import { RoleRoute } from "./shared/components/RoleRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthState>
      <AuthContext.Consumer>
        {({ isAuth }) => (
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={isAuth ? <RoleRoute /> : <Login />}
              />
            </Routes>
          </Router>
        )}
      </AuthContext.Consumer>
    </AuthState>
  );
}

export default App;
