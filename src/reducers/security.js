import * as eventTypes from "../actions/event-types";

import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function securityReducer(state = initialState.security, action) {
  switch (action.type) {
    case EVENT.SECURITY_STATE_UPDATE:
      return action.security;
    default:
      return state;
  }
}
