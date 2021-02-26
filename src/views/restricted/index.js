import Container from "@material-ui/core/Container";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

const Restricted = withStyles(styles)(() => {
  return (
    <Container>
      <h6>Restricted</h6>
    </Container>
  );
});

export default withStyles(styles)(Restricted);
