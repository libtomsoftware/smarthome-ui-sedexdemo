import history from "../providers/history.js";

class ErrorHandlerService {
  handle(error) {
    if (error.networkError) {
      console.warn("error", error.networkError.statusCode);

      if (error.networkError.statusCode === 400) {
        history.push("/logout");
      }
    }
  }
}

export default new ErrorHandlerService();
