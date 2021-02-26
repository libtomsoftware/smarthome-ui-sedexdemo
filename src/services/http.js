import * as eventTypes from "../actions/event-types";

import axios from "axios";

const { EVENT } = eventTypes;

class HttpService {
  constructor() {
    this.configure = this.configure.bind(this);
    this.displayErrorModal = this.displayErrorModal.bind(this);
  }

  configure(dispatch) {
    this.dispatch = dispatch;
  }

  displayErrorModal(title, content) {
    this.dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: {
        title: title || "Oops, something went wrong...",
        content: content
          ? `Error details: ${content}`
          : "Server connection error.",
      },
    });
  }

  async post(url, payload, onSuccess, onError) {
    let response;

    try {
      response = await axios.post(url, payload);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      this.displayErrorModal(
        error.response ? error.response.statusCode : undefined,
        error.response ? error.response.statusText : undefined
      );
      return response;
    }
  }

  async put(url, payload, onSuccess, onError) {
    let response;

    try {
      response = await axios.put(url, payload);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      this.displayErrorModal(
        error.response ? error.response.statusCode : undefined,
        error.response ? error.response.statusText : undefined
      );

      return response;
    }
  }

  async get(url, onSuccess, onError) {
    let response;

    try {
      response = await axios.get(url);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      this.displayErrorModal(
        error.response ? error.response.statusText : undefined
      );

      return response;
    }
  }

  async delete(url, onSuccess, onError) {
    let response;

    try {
      response = await axios.delete(url);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      this.displayErrorModal(
        error.response ? error.response.statusText : undefined
      );

      return response;
    }
  }
}

export default new HttpService();
