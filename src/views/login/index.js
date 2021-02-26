import * as eventTypes from "../../actions/event-types";

import { FormattedMessage, injectIntl } from "react-intl";
import React, { useState } from "react";

import AuthService from "../../services/auth";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { InputText } from "../../components/InputText";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ValidatorService from "../../services/validator";
import history from "../../providers/history.js";
import { updateUser } from "../../actions/user";
import { useStateValue } from "../../providers/state";
import { withStyles } from "@material-ui/core/styles";

const { EVENT } = eventTypes;

const styles = (theme) => {
  const { spacing } = theme.standard;

  return {
    root: {
      margin: spacing.double,
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    moreActions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  };
};

function validate(values) {
  const { username, password } = values;
  const { isValidEmail, isProvided } = ValidatorService;
  const errors = {};

  if (!isProvided(username)) {
    errors.username = "Required";
    return errors;
  }

  if (!isProvided(password)) {
    errors.password = "Required";
    return errors;
  }

  if (!isValidEmail(username)) {
    errors.username = "Invalid username, this should be an email address";
    return errors;
  }

  return errors;
}

const LoginView = (props) => {
  const [, dispatch] = useStateValue();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const [isLoginInProgress, setLoginInProgress] = useState(false);
  const { classes, intl } = props;
  const { formatMessage } = intl;

  function onLoginError() {
    setValidation({});
    setLoginInProgress(false);

    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: {
        title: formatMessage({ id: "error.login" }),
        content: formatMessage({ id: "errorDetails.notLoggedIn" }),
      },
    });
  }

  function onLoginSuccess(user) {
    setValidation({});
    setLoginInProgress(false);
    setUsername("");
    setPassword("");
    updateUser(dispatch, user);
    history.push("/dashboard");
  }

  function attemptLogin(username, password) {
    setLoginInProgress(true);
    const validationResult = validate({ username, password });

    setValidation(validationResult);

    if (!Object.keys(validationResult).length && !isLoginInProgress) {
      AuthService.login({ username, password }, onLoginSuccess, onLoginError);
    }
  }

  return (
    <Box className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="label.login" />
          </Typography>
          <Box className={classes.form}>
            <InputText
              autoFocus={true}
              fullWidth={true}
              label={<FormattedMessage id="label.email" />}
              value={username}
              touched={username !== ""}
              variant="outlined"
              onChange={(event) => {
                setValidation({});
                setUsername(event.target.value);
              }}
              error={validation.username}
            />
            <InputText
              fullWidth={true}
              label={<FormattedMessage id="label.password" />}
              value={password}
              type="password"
              variant="outlined"
              touched={password !== ""}
              onChange={(event) => {
                setValidation({});
                setPassword(event.target.value);
              }}
              error={validation.password}
            />
            {/* TEMP HARDCODED FEATURE FLAG */}
            {false && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Box className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {
                  attemptLogin(username, password);
                }}
                disabled={
                  !username ||
                  !password ||
                  isLoginInProgress ||
                  !ValidatorService.isValidEmail(username)
                }
              >
                {<FormattedMessage id="general.login" />}
              </Button>
            </Box>
            <Box className={classes.moreActions}>
              {/* TEMP HARDCODED FEATURE FLAG */}
              {false && (
                <div>
                  <Link href="#" component={RouterLink}>
                    <FormattedMessage id="label.passwordForgotten" />
                  </Link>

                  <Link to="register" component={RouterLink}>
                    <FormattedMessage id="label.register" />
                  </Link>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export const Login = withStyles(styles)(injectIntl(LoginView));
