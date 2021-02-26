import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getReportsEvent(reports) {
  return {
    type: EVENT.REPORTS_UPDATE,
    reports,
  };
}

export function setReports(reports, dispatch) {
  dispatch(getReportsEvent(reports));
}
