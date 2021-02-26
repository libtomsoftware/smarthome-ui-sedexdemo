import { hideAppLoader, showAppLoader } from "../actions/loader";

import HttpService from "./http";

class DataService {
  configure(url) {
    this.url = url;
  }

  defaultOnSuccess = (dispatch) => () => {
    hideAppLoader(dispatch);
  };

  defaultOnError = (dispatch) => (error) => {
    console.warn("error", error);
    hideAppLoader(dispatch);
  };

  getSecurityStatus(dispatch) {
    showAppLoader(dispatch);
    return HttpService.get(
      `${this.url}/status`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  getDevices(dispatch) {
    showAppLoader(dispatch);
    return HttpService.get(
      `${this.url}/devices`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  deleteDevice(id, pin, dispatch) {
    showAppLoader(dispatch);
    return HttpService.delete(
      `${this.url}/devices/${id}?pin=${pin}`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  restartDevice(id, pin, dispatch) {
    showAppLoader(dispatch);

    return HttpService.put(
      `${this.url}/tasks?pin=${pin}`,
      {
        device: id,
        command: "sudo shutdown -r now",
      },
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  shutdownDevice(id, pin, dispatch) {
    showAppLoader(dispatch);

    return HttpService.put(
      `${this.url}/tasks?pin=${pin}`,
      {
        device: id,
        command: "sudo shutdown now",
      },
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  getReports(dispatch) {
    showAppLoader(dispatch);
    return HttpService.get(
      `${this.url}/reports`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  deleteReport(id, pin, dispatch) {
    showAppLoader(dispatch);
    return HttpService.delete(
      `${this.url}/reports/${id}?pin=${pin}`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  deleteAllReports(pin, dispatch) {
    showAppLoader(dispatch);
    return HttpService.delete(
      `${this.url}/reports?pin=${pin}`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  getTasks(dispatch) {
    showAppLoader(dispatch);
    return HttpService.get(
      `${this.url}/tasks`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  deleteTask(id, pin, dispatch) {
    showAppLoader(dispatch);
    return HttpService.delete(
      `${this.url}/tasks/${id}?pin=${pin}`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  deleteAllTasks(pin, dispatch) {
    showAppLoader(dispatch);
    return HttpService.delete(
      `${this.url}/tasks?pin=${pin}`,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }

  setSecurityStatus(status, dispatch) {
    showAppLoader(dispatch);

    return HttpService.post(
      `${this.url}/status`,
      status,
      this.defaultOnSuccess(dispatch),
      this.defaultOnError(dispatch)
    );
  }
}

export default new DataService();
