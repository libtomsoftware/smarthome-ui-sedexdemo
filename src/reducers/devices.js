import * as eventTypes from "../actions/event-types";

import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function devicesReducer(state = initialState.devices, action) {
  switch (action.type) {
    case EVENT.DEVICES_UPDATE:
      return action.devices;
    default:
      return state;
  }
}
