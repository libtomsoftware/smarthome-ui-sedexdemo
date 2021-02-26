import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { FormattedMessage } from "react-intl";
import List from "@material-ui/core/List";
import React from "react";
import { SidebarLink } from "./SidebarLink";
//import auth from "../services/auth";
import { closeSidebar } from "../../actions/sidebar";
import { useStateValue } from "../../providers/state";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  list: {
    width: "250px",
  },
  locksley: {
    alignItems: "center",
    display: "flex",
    fontSize: "2em",
    height: "55px",
    padding: "0 16px",
  },
  locksleyBrand: {
    display: "inline-block",
    fontSize: "0.6em",
    fontFamily: "comfortaaregular, sans-serif",
    lineHeight: "55px",
    marginLeft: "18px",
    paddingTop: "10px",
  },
  brandLogo: {
    margin: "20px",
    width: "90%",
    maxWidth: "200px",
    maxHeight: "100px",
  },
});

const Sidebar = withStyles(styles)((props) => {
  const { classes } = props;
  const [{ sidebar }, dispatch] = useStateValue();
  //const isLoggedIn = auth.check();

  return (
    <aside>
      <Drawer
        open={sidebar}
        onClose={() => closeSidebar(dispatch)}
        onClick={() => closeSidebar(dispatch)}
      >
        <div className={classes.list}>
          <Box className={classes.locksley}>
            <i className="fab fa-pied-piper-hat" />
            <span className={classes.locksleyBrand}>Albert Locksley</span>
          </Box>
          <Divider />
          <List>
            <SidebarLink
              to="/dashboard"
              label={<FormattedMessage id="navigation.dashboard" />}
              faIcon="home"
            />
            <SidebarLink
              to="/reports"
              label={<FormattedMessage id="navigation.reports" />}
              faIcon="flag"
            />
            <SidebarLink
              to="/security"
              label={<FormattedMessage id="navigation.security" />}
              faIcon="shield-alt"
            />
          </List>
          <Divider />
          <List>
            <SidebarLink
              to="/devices"
              label={<FormattedMessage id="navigation.devices" />}
              faIcon="server"
            />
            <SidebarLink
              to="/tasks"
              label={<FormattedMessage id="navigation.tasks" />}
              faIcon="tasks"
            />
          </List>
        </div>
        {/* {!!isLoggedIn && <Divider />}
        <List>
          <SidebarLink
            to="/login"
            label={<FormattedMessage id="navigation.login" />}
            icon={<FingerprintIcon />}
            isHidden={!!isLoggedIn}
          />
          <SidebarLink
            to="/logout"
            label={<FormattedMessage id="navigation.logout" />}
            icon={<ExitToAppIcon />}
            isHidden={!isLoggedIn}
          />
        </List> */}
      </Drawer>
    </aside>
  );
});

export default Sidebar;
