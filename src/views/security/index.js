import React, { useEffect } from "react";

import DataService from "../../services/data";
import { EVENT } from "../../actions/event-types";
import KeyPad from "../../components/KeyPad";
import SecurityView from "./view";
import moment from "moment";
import { setSecurity } from "../../actions/security";
import { useStateValue } from "../../providers/state";

const ALARM_COUNTDOWN = 30;
const getTimeDifference = (updated) => {
  return moment().diff(updated, "seconds");
};

const getCurrentCountDown = (isArmed, isEnabled, timeDifference) => {
  let countdown = 0;

  if (
    isEnabled === "1" &&
    isArmed === "0" &&
    timeDifference < ALARM_COUNTDOWN
  ) {
    countdown = ALARM_COUNTDOWN - timeDifference;
  }

  return countdown;
};

export const Security = () => {
  const [{ security }, dispatch] = useStateValue();

  const onPinReady = (pin) => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null,
    });
    changeState(pin);
  };

  const showKeypad = () => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: {
        content: <KeyPad onPinReady={onPinReady} />,
      },
    });
  };

  const handleStatusResponse = ({ is_armed, is_enabled, updated }) => {
    setSecurity(
      {
        isArmed: is_armed,
        isEnabled: is_enabled,
        lastUpdated: updated,
      },
      dispatch
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataService.getSecurityStatus(dispatch);

      if (response && response.data) {
        handleStatusResponse(response.data);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!security) {
    return null;
  }

  const { isArmed, isEnabled, lastUpdated } = security;
  const timeDifference = getTimeDifference(lastUpdated);
  const countdown = getCurrentCountDown(isArmed, isEnabled, timeDifference);

  const onFabClick = async () => {
    showKeypad();
  };

  const changeState = async (pin) => {
    const isCurrentlyEnabled = security.isEnabled === "1";

    const status = {
      pin,
      is_armed: "0", //security.isArmed === "1" ? "0" : "1", - final solution should
      is_enabled: isCurrentlyEnabled ? "0" : "1",
    };

    const response = await DataService.setSecurityStatus(status, dispatch);

    if (response && response.data) {
      handleStatusResponse(response.data);
    }
  };

  const onCountdownFinished = async () => {
    const response = await DataService.getSecurityStatus(dispatch);

    if (response && response.data) {
      handleStatusResponse(response.data);
    }
  };

  return (
    <SecurityView
      isArmed={security.isArmed}
      isEnabled={security.isEnabled}
      onFabClick={onFabClick}
      countdown={countdown}
      onCountdownFinished={onCountdownFinished}
    />
  );
};
