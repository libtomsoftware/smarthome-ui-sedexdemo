import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { FormattedMessage } from "react-intl";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Timer } from "./timer";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  status: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "5%",
  },
  shield: {
    color: theme.palette.gray.main,
    display: "flex",
    fontSize: "6em",
    justifyContent: "center",
    padding: "16px",
  },
  shieldArmed: {
    color: theme.palette.error.main,
  },
  traffic: {
    color: theme.palette.gray.main,
    display: "flex",
    fontSize: "3em",
    justifyContent: "center",
    padding: "16px",
  },
  trafficEnabled: {
    color: theme.palette.success.main,
  },
  countdown: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "16px",
  },
  countdownTimer: {
    display: "flex",
    fontSize: "2em",
    justifyContent: "center",
  },
  paper: {
    alignItems: "center",
    display: "flex",
    margin: "8px",
    maxWidth: "300px",
    width: "100%",
  },
  fab: {
    bottom: "72px",
    position: "absolute",
    right: "16px",
  },
  fabInner: {
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fabInnerArmed: {
    background: theme.palette.error.main,
  },
});

const SecurityView = (props) => {
  const {
    classes,
    countdown,
    isArmed,
    isEnabled,
    onFabClick,
    onCountdownFinished,
  } = props;

  const getFabColor = () => {
    return !isEnabled || isEnabled === "0" ? "primary" : "secondary";
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h3">
        <FormattedMessage id="navigation.security" />
      </Typography>
      <Container className={classes.status}>
        <Paper className={`${classes.paper} animated flipInX`}>
          <Container
            className={`${classes.shield} ${
              isArmed === "1" ? classes.shieldArmed : ""
            }`}
          >
            <i className="fas fa-shield-alt"></i>
          </Container>
        </Paper>
        <Paper className={`${classes.paper} animated flipInX`}>
          <Container
            className={`${classes.traffic} ${
              isEnabled === "1" ? classes.trafficEnabled : ""
            }`}
          >
            <i className="fas fa-traffic-light"></i>
          </Container>
        </Paper>

        {!!countdown && (
          <Paper className={classes.paper}>
            <Container className={`${classes.countdown} animated flash`}>
              <FormattedMessage id="security.countdownToArmed" />
              <Container className={classes.countdownTimer}>
                <Timer
                  seconds={countdown}
                  onCountdownFinished={onCountdownFinished}
                />
              </Container>
            </Container>
          </Paper>
        )}
      </Container>
      <Fab
        color={getFabColor()}
        aria-label="add"
        className={`${classes.fab} animated flipInX`}
        onClick={onFabClick}
      >
        <span
          className={`${classes.fabInner} ${
            isArmed === "1" ? classes.fabInnerArmed : ""
          } animated fadeIn`}
        >
          {isEnabled === "0" && <i className="fas fa-lock-open" />}
          {isEnabled === "1" && isArmed === "0" && (
            <i className="fas fa-unlock-alt" />
          )}
          {isArmed === "1" && <i className="fas fa-lock" />}
        </span>
      </Fab>
    </Container>
  );
};

export default withStyles(styles)(SecurityView);
