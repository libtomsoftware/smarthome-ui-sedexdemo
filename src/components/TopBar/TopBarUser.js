import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import history from "../../providers/history.js";

const styles = theme => {
  return {
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    userDataWrapper: {
      display: "flex"
    },
    userName: {
      lineHeight: "48px"
    }
  };
};

const TopBarUser = props => {
  const { classes, user } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function goTo(path) {
    return () => {
      history.push(path);
      closeMenu();
    };
  }

  return (
    <Box>
      <Box className={classes.userDataWrapper}>
        <Typography className={classes.userName}>{user.firstname}</Typography>
        <IconButton
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={closeMenu}
        >
          <MenuItem onClick={goTo("/account")}>
            {<FormattedMessage id="topbar.myaccount" />}
          </MenuItem>
          <MenuItem onClick={goTo("/logout")}>
            {<FormattedMessage id="topbar.logout" />}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(TopBarUser);
