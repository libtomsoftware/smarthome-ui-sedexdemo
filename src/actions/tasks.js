import * as eventTypes from "./event-types";

const { EVENT } = eventTypes;

function getTasksEvent(tasks) {
  return {
    type: EVENT.TASKS_UPDATE,
    tasks,
  };
}

export function setTasks(tasks, dispatch) {
  dispatch(getTasksEvent(tasks));
}
