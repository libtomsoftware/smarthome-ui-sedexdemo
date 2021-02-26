import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getDevicesEvent(devices) {
  return {
    type: EVENT.DEVICES_UPDATE,
    devices,
  };
}

export function setDevices(devices, dispatch) {
  dispatch(getDevicesEvent(devices));
}
