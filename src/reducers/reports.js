import * as eventTypes from "../actions/event-types";

import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function reportsReducer(state = initialState.reports, action) {
  switch (action.type) {
    case EVENT.REPORTS_UPDATE:
      return action.reports;
    default:
      return state;
  }
}
