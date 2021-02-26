import devicesReducer from "./devices";
import loaderReducer from "./loader";
import modalReducer from "./modal";
import reportsReducer from "./reports";
import securityReducer from "./security";
import sidebarReducer from "./sidebar";
import tasksReducer from "./tasks";
import userReducer from "./user";

export const rootContextReducer = (
  { devices, loader, modal, reports, sidebar, security, tasks, user },
  action
) => {
  return {
    devices: devicesReducer(devices, action),
    loader: loaderReducer(loader, action),
    modal: modalReducer(modal, action),
    reports: reportsReducer(reports, action),
    security: securityReducer(security, action),
    sidebar: sidebarReducer(sidebar, action),
    tasks: tasksReducer(tasks, action),
    user: userReducer(user, action),
  };
};
