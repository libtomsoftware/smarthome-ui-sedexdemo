import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getUserUpdateEvent(user) {
  return {
    type: EVENT.USER_UPDATE,
    user
  };
}

export function updateUser(dispatch, user) {
  dispatch(getUserUpdateEvent(user));
}
