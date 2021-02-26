import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import { useStateValue } from "../providers/state";

export const AppLoader = withStyles(theme => ({
  appLoader: {
    background: "rgba(10, 10, 10, 0.85)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    display: "none",
    flexDirection: "column",
    justifyItems: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  appLoaderVisible: {
    display: "flex"
  }
}))(props => {
  const { classes } = props;
  const [{ loader }] = useStateValue();

  return (
    <div
      className={classNames([
        [classes.appLoader],
        { [classes.appLoaderVisible]: loader, "animated fadeIn": loader }
      ])}
    >
      <CircularProgress color="secondary" size={100} thickness={10} />
    </div>
  );
});
