import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  //estado inicial
  const initialAuthState = {
    auth: false,
    role: "",
  };

  const [state, setState] = useState(() => {
    // Cargar el estado inicial desde localStorage, si existe
    const savedState = localStorage.getItem("authState");

    if (savedState) {
      return JSON.parse(savedState);
    }

    //si no a existido ningun cambio de estado, se guardara el estado inicial
    return initialAuthState;
  });

  useEffect(() => {
    // Guardar el estado en localStorage cada vez que cambie
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.auth,
        isRole: state.role,
        setState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
