import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  keypad: {
    textAlign: "center",
  },
  key: {
    fontSize: "2em",
    margin: "6px",
    position: "relative",
    "&:active": {
      top: "2px",
    },
  },
  ghost: {
    margin: "16px 0 32px 0",
    display: "flex",
    justifyContent: "center",
  },
  ghostItem: {
    display: "inline-block",
    margin: "0 8px",
    fontStyle: "normal",
    width: "16px",
    height: "16px",
    alignItems: "center",
  },
  ghostItemValue: {
    background: "white",
    borderRadius: "50%",
  },
  keySpecial: {
    fontSize: "1em",
  },
  keysRow: {
    padding: "0",
  },
});

const keys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const KeyPad = (props) => {
  const { classes, onPinReady, id, task } = props;
  const [pin, setPin] = useState("");

  function onClick(key) {
    if (typeof key === "number") {
      setPin(pin + key);
    }

    if (key === "clear") {
      setPin("");
    }

    if (key === "delete") {
      const pinArray = pin.split("");
      pinArray.pop();
      setPin(pinArray.join(""));
    }
  }

  function getKey(key, index) {
    return (
      <Fab
        key={index}
        className={classes.key}
        color="primary"
        aria-label={key}
        onClick={() => onClick(key)}
      >
        {key}
      </Fab>
    );
  }

  function getGhost() {
    const numberOfDigits = pin.length;
    const max = 6;
    let ghost = [];
    let x;

    for (x = 0; x < max; x += 1) {
      const isValue = x < numberOfDigits;

      ghost.push(
        <em
          className={`${classes.ghostItem} ${
            isValue ? classes.ghostItemValue : ""
          }`}
          key={x}
        >
          -
        </em>
      );
    }

    return ghost;
  }

  useEffect(() => {
    if (pin.length === 6) {
      onPinReady(pin, id, task);
    }
  }, [pin, id, task, onPinReady]);

  return (
    <Box className={classes.keypad}>
      <Container className={classes.ghost}>{getGhost()}</Container>
      <Container className={classes.keysRow}>
        {keys[0].map((key, index) => getKey(key, index))}
      </Container>
      <Container className={classes.keysRow}>
        {keys[1].map((key, index) => getKey(key, index))}
      </Container>
      <Container className={classes.keysRow}>
        {keys[2].map((key, index) => getKey(key, index))}
      </Container>
      <Container className={classes.keysRow}>
        <Fab
          className={`${classes.key} ${classes.keySpecial}`}
          color="primary"
          aria-label={"clear"}
          onClick={() => onClick("clear")}
        >
          clr
        </Fab>
        <Fab
          className={classes.key}
          color="primary"
          aria-label={"0"}
          onClick={() => onClick(0)}
        >
          0
        </Fab>
        <Fab
          className={`${classes.key} ${classes.keySpecial}`}
          color="primary"
          aria-label={"delete"}
          onClick={() => onClick("delete")}
        >
          del
        </Fab>
      </Container>
    </Box>
  );
};

export default withStyles(styles)(KeyPad);
