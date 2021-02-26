import { AppLoader } from "./components/AppLoader";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import React from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { withStyles } from "@material-ui/core/styles";

export const Layout = withStyles((theme) => ({
  root: {
    minHeight: "100%",
    maxWidth: '500px',
    width: '100%'
  },
  main: {
    minHeight: "100%",
  },
}))((props) => {
  const { classes, children } = props;

  return (
    <Box className={classes.root}>
      <Modal />
      <CssBaseline />
      <AppLoader />
      <TopBar />
      <Sidebar />
      <Box component="main" className={classes.main}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
});
