import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  // if it is exists and it it is more than one hour then reset
  const DecodedToken = jwtDecode(localStorage.getItem("token"));
  if (DecodedToken.exp * 1000 < Date.now()) {
    // reset it
 
    localStorage.removeItem("token");
  } else {
    // keep setting it to the user
  
    initialState.user = DecodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  function login(userData) {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, user: state.user }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
