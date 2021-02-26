import React, { createContext, useContext, useReducer } from "react";
import { rootContextReducer } from "../reducers";
import initialState from "../store/initial-state";

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(rootContextReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
