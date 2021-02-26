import * as eventTypes from "../actions/event-types";
import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function loaderReducer(state = initialState.loader, action) {
  switch (action.type) {
    case EVENT.LOADER_STATE_UPDATE:
      return action.loader;
    default:
      return state;
  }
}
