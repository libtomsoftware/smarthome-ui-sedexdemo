import * as eventTypes from "../actions/event-types";
import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case EVENT.USER_UPDATE:
      return action.user;
    default:
      return state;
  }
}
