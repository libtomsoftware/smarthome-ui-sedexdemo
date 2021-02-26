import React from "react";
import Slide from "@material-ui/core/Slide";

class TransitionsService {
  slide = direction => {
    return React.forwardRef(function Transition(props, ref) {
      return <Slide direction={direction} ref={ref} {...props} />;
    });
  };
}

export default new TransitionsService();
