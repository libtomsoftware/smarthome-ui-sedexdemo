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

function sortReportsByDate(reports) {
  return reports.sort((reportA, reportB) => {
    return parseInt(reportA.timestamp, 10) - parseInt(reportB.timestamp, 10);
  });
}

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
  reports: {
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
  noReports: {
    marginTop: "10%",
    padding: "16px",
  },
  deleteKey: {
    background: theme.palette.error.main,
    color: "white",
    fontSize: "0.85em",
    position: "absolute",
    right: "16px",
    top: "82px",
    "&:active": {
      top: "84px",
    },
  },
  image: {
    width: "100px",
  },
  media: {
    display: "flex",
  },
  videoIconFab: {
    marginLeft: "16px",
  },
  videoIcon: {
    color: "white",
    fontSize: "1.4em",
  },
});

const ReportsView = (props) => {
  const { reports, onFabClick, classes } = props;

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h3">
        <FormattedMessage id="navigation.reports" />
      </Typography>
      {(!reports || reports.length === 0) && (
        <Paper className={classes.noReports}>
          <Typography variant="body1">
            <FormattedMessage id="reports.noreports" />
          </Typography>
        </Paper>
      )}
      {!!reports && !!reports.length && (
        <Container className={classes.reports}>
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
          {sortReportsByDate(reports).map((report, index) => {
            const reportDatetimeFormatted = moment
              .unix(report.timestamp)
              .format("DD/MM/YYYY HH:mm:ss");

            return (
              <Accordion
                className={`${classes.accordion} animated flipInX`}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${report.id}-content`}
                  id={`${report.id}-header`}
                >
                  <Typography className={classes.heading}>
                    {reportDatetimeFormatted}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <Fab
                    className={`${classes.deleteKey} animated flipInX`}
                    aria-label={"delete"}
                    color="secondary"
                    onClick={() => onFabClick(report.id, "delete")}
                  >
                    <FormattedMessage id="general.remove" />
                  </Fab>
                  <Box className={classes.details}>
                    <Typography variant="h6">
                      <FormattedMessage id="reports.reportId" />
                    </Typography>
                    <Typography variant="body2">{report.id}</Typography>
                  </Box>

                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="reports.datetime" />
                            </Typography>
                            <Typography variant="body2">
                              {reportDatetimeFormatted}
                            </Typography>
                          </Box>
                        </td>
                        <td>
                          <Box className={classes.details}>
                            <Typography variant="h6">
                              <FormattedMessage id="reports.device" />
                            </Typography>
                            <Typography variant="body2">
                              {report.deviceName || report.device}
                            </Typography>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <Box className={`${classes.details} ${classes.media}`}>
                    {!!report.imageUrl && (
                      <a
                        href={report.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className={classes.image}
                          src={report.imageUrl}
                          alt={report.image}
                        />
                      </a>
                    )}
                    {!!report.videoUrl && (
                      <Fab
                        className={`${classes.videoIconFab} animated flipInX`}
                        aria-label={"delete"}
                        color="primary"
                        href={report.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fas fa-video ${classes.videoIcon}`}></i>
                      </Fab>
                    )}
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

export default withStyles(styles)(ReportsView);
