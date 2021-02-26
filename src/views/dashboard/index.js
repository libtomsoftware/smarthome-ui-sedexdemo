import React, { useEffect } from "react";

import DashboardView from "./view";
import DataService from "../../services/data";
import { setDevices } from "../../actions/devices";
import { setReports } from "../../actions/reports";
import { setTasks } from "../../actions/tasks";
import { useStateValue } from "../../providers/state";

export const Dashboard = () => {
  const [{ devices, reports, tasks }, dispatch] = useStateValue();

  useEffect(() => {
    try {
      DataService.getDevices(dispatch).then((response) => {
        if (response && response.data) {
          setDevices(response.data, dispatch);
        }
      });
      DataService.getReports(dispatch).then((response) => {
        if (response && response.data) {
          setReports(response.data, dispatch);
        }
      });
      DataService.getTasks(dispatch).then((response) => {
        if (response && response.data) {
          setTasks(response.data, dispatch);
        }
      });
    } catch (error) {
      console.error("Error", error);
    }
  }, [dispatch]);

  return <DashboardView devices={devices} reports={reports} tasks={tasks} />;
};
