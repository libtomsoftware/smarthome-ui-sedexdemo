import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getSidebarStateUpdateEvent(state) {
  return {
    type: EVENT.SIDEBAR_STATE_UPDATE,
    sidebar: state
  };
}

export function toggleSidebar(value, dispatch) {
  dispatch(getSidebarStateUpdateEvent(value));
}

export function openSidebar(dispatch) {
  dispatch(getSidebarStateUpdateEvent(true));
}

export function closeSidebar(dispatch) {
  dispatch(getSidebarStateUpdateEvent(false));
}
