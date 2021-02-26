import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import { FormattedMessage } from "react-intl";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  devices: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "5%",
    width: "100%",
  },
  deviceActive: {},
  deviceInactive: {
    color: theme.palette.error.main,
  },
  accordion: {
    width: "100%",
  },
  details: {
    display: "block",
    margin: "8px 0",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  noDevices: {
    marginTop: "10%",
    padding: "16px",
  },
  warningIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: "16px",
    color: theme.palette.warning.main,
  },
  shutdownKey: {
    background: theme.palette.error.main,
    color: "white",
    fontSize: "0.85em",
    position: "absolute",
    right: "16px",
    top: "226px",
    "&:active": {
      top: "228px",
    },
  },
  restartKey: {
    fontSize: "0.85em",
    position: "absolute",
    right: "16px",
    top: "154px",
    "&:active": {
      top: "156px",
    },
  },
});

const DevicesView = (props) => {
  const { devices, onFabRestartClick, onFabShutdownClick, classes } = props;

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h3">
        <FormattedMessage id="navigation.devices" />
      </Typography>
      {(!devices || devices.length === 0) && (
        <Paper className={classes.noDevices}>
          <Typography variant="body1">
            <FormattedMessage id="devices.nodevices" />
          </Typography>
        </Paper>
      )}
      {!!devices && !!devices.length && (
        <Container className={classes.devices}>
          {devices.map((device, index) => {
            const diff = moment().diff(device.lastChecked, "minutes");
            const isLate = diff > 5;

            return (
              <Accordion
                className={`${classes.accordion} animated flipInX`}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${device.id}-content`}
                  id={`${device.id}-header`}
                >
                  {isLate && (
                    <i
                      className={`fas fa-exclamation-triangle ${classes.warningIcon}`}
                    ></i>
                  )}
                  <Typography className={classes.heading}>
                    {device.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <Fab
                    className={classes.restartKey}
                    aria-label={"restart"}
                    color="secondary"
                    onClick={() => onFabRestartClick(device.id)}
                  >
                    <FormattedMessage id="general.restart" />
                  </Fab>
                  <Fab
                    className={classes.shutdownKey}
                    aria-label={"restart"}
                    color="secondary"
                    onClick={() => onFabShutdownClick(device.id)}
                  >
                    <FormattedMessage id="general.shutdown" />
                  </Fab>

                  <Box className={classes.details}>
                    <Typography variant="h6">
                      <FormattedMessage id="devices.deviceId" />
                    </Typography>
                    <Typography variant="body2">{device.id}</Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography variant="h6">
                      <FormattedMessage id="devices.type" />
                    </Typography>
                    <Typography variant="body2">
                      <FormattedMessage id={`devices.type.${device.type}`} />
                    </Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography variant="h6">
                      <FormattedMessage id="devices.lastChecked" />
                    </Typography>
                    <Typography
                      variant="body2"
                      className={
                        isLate ? classes.deviceInactive : classes.deviceActive
                      }
                    >
                      {moment(device.lastChecked).format("DD/MM/YYYY HH:mm:ss")}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default withStyles(styles)(DevicesView);
