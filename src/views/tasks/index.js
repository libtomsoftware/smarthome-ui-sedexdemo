import React, { useEffect } from "react";

import DataService from "../../services/data";
import { EVENT } from "../../actions/event-types";
import KeyPad from "../../components/KeyPad";
import TasksView from "./view";
import { setTasks } from "../../actions/tasks";
import { useStateValue } from "../../providers/state";

export const Tasks = () => {
  const [{ devices, tasks }, dispatch] = useStateValue();
  const updatedTasks = tasks.map((task) => {
    const updatedTask = { ...task };
    const device = devices.find((item) => item.id === task.device);

    if (device) {
      updatedTask.deviceName = device.name;
    }

    return updatedTask;
  });

  const onPinReady = (pin, id, task) => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null,
    });

    if (task === "delete") {
      onTaskDelete(pin, id);
    }

    if (task === "delete-all") {
      onDeleteAllTasks(pin);
    }
  };

  const showKeypad = (id, task) => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: {
        content: <KeyPad onPinReady={onPinReady} id={id} task={task} />,
      },
    });
  };

  const onFabClick = (id, task) => {
    showKeypad(id, task);
  };

  const handleTasksResponse = (data) => {
    setTasks(data, dispatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataService.getTasks(dispatch);

      if (response && response.data) {
        handleTasksResponse(response.data);
      }
    };

    fetchData();
  }, [dispatch]);

  const onTaskDelete = (pin, id) => {
    DataService.deleteTask(id, pin, dispatch).then((response) => {
      if (response && response.data) {
        handleTasksResponse(response.data);
      }
    });
  };

  const onDeleteAllTasks = (pin) => {
    DataService.deleteAllTasks(pin, dispatch).then((response) => {
      if (response && response.data) {
        handleTasksResponse(response.data);
      }
    });
  };

  return <TasksView tasks={updatedTasks} onFabClick={onFabClick} />;
};
