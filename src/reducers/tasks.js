import * as eventTypes from "../actions/event-types";

import initialState from "../store/initial-state";

const { EVENT } = eventTypes;

export default function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case EVENT.TASKS_UPDATE:
      return action.tasks;
    default:
      return state;
  }
}
