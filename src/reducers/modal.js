import * as eventTypes from "../actions/event-types";
import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function modalReducer(state = initialState.modal, action) {
  switch (action.type) {
    case EVENT.MODAL_STATE_UPDATE:
      return action.modal;
    default:
      return state;
  }
}
