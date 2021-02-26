import React, { useEffect } from "react";

import DataService from "../../services/data";
import { EVENT } from "../../actions/event-types";
import KeyPad from "../../components/KeyPad";
import ReportsView from "./view";
import { setReports } from "../../actions/reports";
import { useStateValue } from "../../providers/state";

export const Reports = () => {
  const [{ devices, reports }, dispatch] = useStateValue();
  const updatedReports = reports.map((report) => {
    const updatedReport = { ...report };
    const device = devices.find((item) => item.id === report.device);

    if (device) {
      updatedReport.deviceName = device.name;
    }

    return updatedReport;
  });

  const onPinReady = (pin, id, task) => {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null,
    });

    if (task === "delete") {
      onReportDelete(pin, id);
    }

    if (task === "delete-all") {
      onDeleteAllReports(pin);
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

  const onFabClick = async (id, task) => {
    showKeypad(id, task);
  };

  const handleReportsResponse = (data) => {
    setReports(data, dispatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await DataService.getReports(dispatch);
      if (response && response.data) {
        handleReportsResponse(response.data);
      }
    };

    fetchData();
  }, [dispatch]);

  const onReportDelete = (pin, id) => {
    DataService.deleteReport(id, pin, dispatch).then((response) => {
      if (response && response.data) {
        handleReportsResponse(response.data);
      }
    });
  };

  const onDeleteAllReports = (pin) => {
    DataService.deleteAllReports(pin, dispatch).then((response) => {
      if (response && response.data) {
        handleReportsResponse(response.data);
      }
    });
  };

  return <ReportsView reports={updatedReports} onFabClick={onFabClick} />;
};
