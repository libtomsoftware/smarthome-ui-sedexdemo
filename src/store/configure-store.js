import { applyMiddleware, createStore } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { rootReduxReducer } from "../reducers";

export default function configureStore(initialState) {
  return createStore(
    rootReduxReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
