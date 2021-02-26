import "fontsource-roboto";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

import DataService from "./services/data";
import { HttpServiceProvider } from "./providers/http";
import { IntlProvider } from "react-intl";
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "./routes";
import { StateProvider } from "./providers/state";
import { Theme } from "./providers/theme";
import { en } from "moment/locale/en-gb";
import intlMessagesEN from "./providers/i18n/en.json";
import intlMessagesPL from "./providers/i18n/pl.json";
import moment from "moment";
import { pl } from "moment/locale/pl";

const MomentLocales = {
  pl, en
};

const intlMessages = {
  en: intlMessagesEN,
  pl: intlMessagesPL,
};

function renderApp(config) {
  const { LOCALE, SMARTHOME_CENTRAL_URL } = config;

  const i18nConfig = {
    locale: LOCALE,
    messages: intlMessages[LOCALE],
  };

  DataService.configure(SMARTHOME_CENTRAL_URL);

  return (
    <Theme>
      <IntlProvider locale={LOCALE} messages={i18nConfig.messages}>
        <StateProvider>
          <HttpServiceProvider>
            <Routes />
          </HttpServiceProvider>
        </StateProvider>
      </IntlProvider>
    </Theme>
  );
}

fetch("/config.json")
  .then((r) => r.json())
  .then((config) => {
    const { LOCALE } = config;

    moment.locale(LOCALE, MomentLocales[LOCALE]);

    ReactDOM.render(renderApp(config), document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
