import * as eventTypes from "../actions/event-types";
import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function sidebarReducer(state = initialState.sidebar, action) {
  switch (action.type) {
    case EVENT.SIDEBAR_STATE_UPDATE:
      return action.sidebar;
    default:
      return state;
  }
}
