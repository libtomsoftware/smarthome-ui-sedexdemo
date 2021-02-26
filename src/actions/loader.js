import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getAppLoaderStateEvent(state) {
  return {
    type: EVENT.LOADER_STATE_UPDATE,
    loader: state
  };
}

export function showAppLoader(dispatch) {
  dispatch(getAppLoaderStateEvent(true));
}

export function hideAppLoader(dispatch) {
  dispatch(getAppLoaderStateEvent(false));
}
