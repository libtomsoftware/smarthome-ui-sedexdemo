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

const getProgressSymbol = (progress) => {
  const variants = {
    comissioned: {
      class: "Comissioned",
      icon: "list",
    },
    failed: {
      class: "Failed",
      icon: "times",
    },
    pending: {
      class: "Pending",
      icon: "spinner",
    },
    success: {
      class: "Success",
      icon: "check-square",
    },
  };

  return variants[progress] || variants.comissioned;
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "16px",
    width: "100%",
  },
  actionDeleteAll: {
    background: theme.palette.error.main,
    color: "white",
  },
  tasks: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "5%",
    width: "100%",
  },
  details: {
    display: "block",
    margin: "8px 0",
  },
  accordion: {
    width: "100%",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  noTasks: {
    marginTop: "10%",
    padding: "16px",
  },
  summaryIcon: {
    alignItems: "center",
    display: "flex",
    marginRight: "8px",
    marginTop: "-3px",
  },
  progressSuccess: {
    color: theme.palette.primary.main,
  },
  progressFailed: {
    color: theme.palette.error.main,
  },
  progressPending: {
    color: theme.palette.secondary.main,
  },
  deleteKey: {
    background: theme.palette.error.main,
    color: "white",
    position: "absolute",
    right: "16px",
    top: "82px",
    "&:active": {
      top: "84px",
    },
  },
});

function sortTasksByDate(tasks) {
  return tasks.sort((taskA, taskB) => {
    return parseInt(taskA.timestamp, 10) - parseInt(taskB.timestamp, 10);
  });
}

const TasksView = (props) => {
  const { tasks, onFabClick, classes } = props;

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h3">
        <FormattedMessage id="navigation.tasks" />
      </Typography>
      {(!tasks || tasks.length === 0) && (
        <Paper className={classes.noTasks}>
          <Typography variant="body1">
            <FormattedMessage id="tasks.notasks" />
          </Typography>
        </Paper>
      )}
      {!!tasks && !!tasks.length && (
        <Container className={classes.tasks}>
          <Box className={classes.actions}>
            <Fab
              variant="extended"
              size="small"
              color="secondary"
              aria-label="add"
              className={classes.actionDeleteAll}
              onClick={() => onFabClick(null, "delete-all")}
            >
              <FormattedMessage id="general.removeAll" />
            </Fab>
          </Box>
          {sortTasksByDate(tasks).map((task, index) => {
            const taskProgressSymbol = getProgressSymbol(task.progress);
            const taskIcon = taskProgressSymbol.icon;
            const taskIconClass = "progress" + taskProgressSymbol.class;

            return (
              <Accordion
                className={`${classes.accordion} animated flipInX`}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${task.id}-content`}
                  id={`${task.id}-header`}
                >
                  <i
                    className={`fas fa-${taskIcon} ${classes.summaryIcon} ${classes[taskIconClass]}`}
                  ></i>
                  <Typography className={classes.heading}>
                    <FormattedMessage id={`tasks.type.${task.type}`} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <Fab
                    className={classes.deleteKey}
                    aria-label={"delete"}
                    color="secondary"
                    onClick={() => onFabClick(task.id, "delete")}
                  >
                    <FormattedMessage id="general.remove" />
                  </Fab>
                  <Box className={classes.details}>
                    <Typography variant="h6">
                      <FormattedMessage id="tasks.taskId" />
                    </Typography>
                    <Typography variant="body2">{task.id}</Typography>
                  </Box>

                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="tasks.type" />
                            </Typography>
                            <Typography variant="body2">
                              <FormattedMessage
                                id={`tasks.type.${task.type}`}
                              />
                            </Typography>
                          </Box>
                        </td>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="tasks.time" />
                            </Typography>
                            <Typography variant="body2">
                              {moment
                                .unix(task.timestamp)
                                .format("DD/MM/YYYY HH:mm:ss")}
                            </Typography>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="tasks.device" />
                            </Typography>
                            <Typography variant="body2">
                              {task.deviceName || task.device}
                            </Typography>
                          </Box>
                        </td>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="tasks.progress" />
                            </Typography>
                            <Typography variant="body2">
                              <FormattedMessage
                                id={`tasks.progress.${task.progress}`}
                              />
                            </Typography>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {task.type === "command" && !!task.command && (
                    <Box className={classes.details}>
                      <Typography variant="h6">
                        <FormattedMessage id="tasks.command" />
                      </Typography>
                      <Typography variant="body2">{task.command}</Typography>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default withStyles(styles)(TasksView);
