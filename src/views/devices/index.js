import React, { useEffect } from "react";

import DataService from "../../services/data";
import DevicesView from "./view";
import { EVENT } from "../../actions/event-types";
import KeyPad from "../../components/KeyPad";
import { setDevices } from "../../actions/devices";
import { useStateValue } from "../../providers/state";

export const Devices = () => {
  const [{ devices }, dispatch] = useStateValue();

  const onPinReady = (pin, id, task) => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null,
    });

    const tasks = {
      restart: onDeviceRestart,
      shutdown: onDeviceShutdown,
    };

    if (task) {
      tasks[task](pin, id);
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

  const onFabRestartClick = (id) => {
    showKeypad(id, "restart");
  };

  const onFabShutdownClick = (id) => {
    showKeypad(id, "shutdown");
  };

  const handleDevicesResponse = (data) => {
    setDevices(data, dispatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataService.getDevices(dispatch);

      if (response && response.data) {
        handleDevicesResponse(response.data);
      }
    };

    fetchData();
  }, [dispatch]);

  const deleteDevice = (pin, id) => {
    DataService.deleteDevice(id, pin, dispatch).then((response) => {
      if (response && response.data) {
        handleDevicesResponse(response.data);
      }
    });
  };

  const onDeviceRestart = (pin, id) => {
    DataService.restartDevice(id, pin, dispatch).then(() => {
      deleteDevice(pin, id);
    });
  };

  const onDeviceShutdown = (pin, id) => {
    DataService.shutdownDevice(id, pin, dispatch).then(() => {
      deleteDevice(pin, id);
    });
  };

  return (
    <DevicesView
      devices={devices}
      onFabRestartClick={onFabRestartClick}
      onFabShutdownClick={onFabShutdownClick}
    />
  );
};
