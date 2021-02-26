import moment from "moment";
import HttpService from "./http";
import StorageService, { storageKeys } from "./storage";
import HelpersService from "./helpers";
import history from "../providers/history.js";

class AuthService {
  isRefreshPending = false;

  configure(url) {
    this.url = url;
  }

  handleLoginSuccess({ data }, onLoginSuccess, onLoginError) {
    const { accessToken, refreshToken, user, sessionExpiry } = data;

    if (accessToken && refreshToken && user && sessionExpiry) {
      StorageService.set(storageKeys.accessToken, accessToken);
      StorageService.set(storageKeys.refreshToken, refreshToken);
      StorageService.set(storageKeys.authUser, JSON.stringify(user));
      StorageService.set(storageKeys.authExpiration, sessionExpiry);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } else {
      if (onLoginError) {
        onLoginError();
      }
    }
  }

  resetLocalAuth() {
    StorageService.remove(storageKeys.accessToken);
    StorageService.remove(storageKeys.refreshToken);
    StorageService.remove(storageKeys.authUser);
    StorageService.remove(storageKeys.authExpiration);
  }

  async login({ username, password }, onLoginSuccess, onLoginError) {
    HttpService.post(
      `${this.url}/login`,
      {
        email: username,
        password
      },
      response => {
        this.handleLoginSuccess(response, onLoginSuccess, onLoginError);
      },
      onLoginError
    );
  }

  async logout(email) {
    HttpService.post(
      `${this.url}/logout`,
      {
        email,
        authorization: StorageService.get(storageKeys.accessToken)
      },
      this.resetLocalAuth,
      error => {
        console.warn("Logout error", error);
      }
    );
  }

  async register(
    { firstname, lastname, email, password },
    onRegistrationSuccess,
    onRegistrationError
  ) {
    HttpService.put(
      `${this.url}/register`,
      { firstname, lastname, email, password },
      onRegistrationSuccess,
      error => {
        const { response } = error;

        if (response && response.status && response.status === 409) {
          onRegistrationError("notRegisteredConflict");
          return;
        }

        if (response && response.status && response.status === 400) {
          onRegistrationError("notRegisteredBadRequest");
          return;
        }

        onRegistrationError("notRegistered");
      }
    );
  }

  check() {
    const accessToken = StorageService.get(storageKeys.accessToken);
    const refreshToken = StorageService.get(storageKeys.refreshToken);
    const userDetails = StorageService.get(storageKeys.authUser);

    if (!!accessToken && !!refreshToken) {
      this.ensureAuth(accessToken, refreshToken);
    }

    return !!accessToken && !!refreshToken && !!userDetails;
  }

  isTokenExpired(token) {
    const { expiration } = HelpersService.decodeToken(token);

    if (!expiration) {
      return true;
    }

    return moment().isAfter(expiration);
  }

  ensureAuth(accessToken, refreshToken) {
    const shouldRefresh = this.isTokenExpired(accessToken);

    if (shouldRefresh && !this.isRefreshPending) {
      this.isRefreshPending = true;

      HttpService.get(
        `${this.url}/is-authorized/${accessToken}`,
        ({ data }) => {
          this.isRefreshPending = false;
          const { isAuthorized } = data;

          if (!isAuthorized) {
            this.refreshAuth(refreshToken);
          }
        },
        error => {
          this.isRefreshPending = false;
          console.warn("Ensure auth error", error);
          this.refreshAuth(refreshToken);
        }
      );
    }
  }

  refreshAuth(refreshToken, failureCallback) {
    if (refreshToken) {
      console.warn("Auth check failed, attempting refresh...");
      HttpService.get(
        `${this.url}/refresh/${refreshToken}`,
        response => {
          console.info("Auth refreshed successfully...");
          this.handleLoginSuccess(response, () => {}, this.resetLocalAuth);
        },
        error => {
          console.error("Refresh auth error", error);
          if (!error.statusCode !== 401) {
            history.push("/logout");
          }
          this.resetLocalAuth();
          if (failureCallback) {
            failureCallback(error);
          }
        }
      );
    } else {
      if (failureCallback) {
        failureCallback();
      }
    }
  }
}

export default new AuthService();
