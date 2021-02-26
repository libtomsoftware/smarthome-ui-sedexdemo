import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import TopBarUser from "./TopBarUser";
import { toggleSidebar } from "../../actions/sidebar";
import { useStateValue } from "../../providers/state";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    appBarLogo: {
      width: "32px",
    },
    appBarTitle: {
      fontFamily: "comfortaaregular, sans-serif",
      fontSize: "1.4em",
      lineHeight: "24px",
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    userWrapper: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
    },
  };
};

const TopBar = (props) => {
  const { classes } = props;
  const [{ sidebar, user }, dispatch] = useStateValue();

  function toggle() {
    toggleSidebar(!sidebar, dispatch);
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={toggle}
        >
          <MenuIcon />
        </IconButton>

        <Box className={classes.userWrapper}>
          {user && <TopBarUser user={user} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
