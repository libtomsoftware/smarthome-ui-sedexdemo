import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DnsIcon from "@material-ui/icons/Dns";
import { FormattedMessage } from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import VideocamIcon from "@material-ui/icons/Videocam";
import WarningIcon from "@material-ui/icons/Warning";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  deviceName: {
    marginRight: "16px",
  },
  noDevices: {
    marginTop: "10%",
  },
  paper: {
    padding: "16px",
  },
  inner: {
    marginBottom: "16px",
  },
});

const DashboardView = (props) => {
  const { classes, devices, reports, tasks } = props;
  const history = useHistory();

  return (
    <Container>
      <Container className={classes.inner}>
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage id="navigation.reports" />
        </Typography>
        <Paper className={`${classes.paper} animated flipInX`} onClick={() => { history.push('/reports'); }}>
          {reports.length > 0 && (
            <Box>
              <FormattedMessage id="reports.numberOfReports" />
              {`: ${reports.length}`}
            </Box>
          )}
          {reports.length === 0 && <FormattedMessage id="reports.noreports" />}
        </Paper>
      </Container>

      <Container className={classes.inner}>
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage id="navigation.devices" />
        </Typography>
        {!!devices && !!devices.length && (
          <Paper className={`animated flipInX`}>
            <List component="nav" aria-label="devices" onClick={() => { history.push('/devices'); }}>
              {devices.map((device, index) => {
                const diff = moment().diff(device.lastChecked, "minutes");
                const isLate = diff > 5;

                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        {device.type === "camera" && <VideocamIcon />}
                        {device.type !== "camera" && <DnsIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={device.name}
                      className={classes.deviceName}
                    />
                    {isLate && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="devices"
                          to="/devices"
                          component={RouterLink}
                        >
                          <WarningIcon color="secondary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}
        {(!devices || devices.length === 0) && (
          <Paper className={`${classes.paper} animated flipInX`}>
            <FormattedMessage id="devices.nodevices" />
          </Paper>
        )}
      </Container>

      <Container className={classes.inner}>
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage id="navigation.tasks" />
        </Typography>
        <Paper className={`${classes.paper} animated flipInX`} onClick={() => { history.push('/tasks'); }}>
          {tasks.length > 0 && (
            <Box>
              <FormattedMessage id="tasks.numberOfTasks" />
              {`: ${tasks.length}`}
            </Box>
          )}
          {tasks.length === 0 && <FormattedMessage id="tasks.notasks" />}
        </Paper>
      </Container>
    </Container>
  );
};

export default withStyles(styles)(DashboardView);
