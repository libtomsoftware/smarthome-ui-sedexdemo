import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import AuthService from "../../services/auth";
import { useStateValue } from "../../providers/state";
import history from "../../providers/history.js";
import { updateUser } from "../../actions/user";

const styles = theme => {
  const { spacing } = theme.standard;

  return {
    root: {
      flexGrow: 1,
      margin: spacing.double
    }
  };
};

const Logout = props => {
  const { classes } = props;
  const [{ user }, dispatch] = useStateValue();

  if (user) {
    AuthService.logout(user.email);
    updateUser(dispatch, null);
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            history.push("/login");
          }}
        >
          <FormattedMessage id="navigation.login" />
          <FingerprintIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Logout);
