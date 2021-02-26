import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getSecurityEvent(state) {
  return {
    type: EVENT.SECURITY_STATE_UPDATE,
    security: state,
  };
}

export function setSecurity(state, dispatch) {
  dispatch(getSecurityEvent(state));
}
