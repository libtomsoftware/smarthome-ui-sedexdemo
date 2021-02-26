import * as eventTypes from "../../actions/event-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormattedMessage } from "react-intl";
import ModalButton from "./ModalButton";
import React from "react";
import Slide from "@material-ui/core/Slide";
import { useStateValue } from "../../providers/state";
import { withStyles } from "@material-ui/core/styles";

const { EVENT } = eventTypes;

const styles = (theme) => ({
  modal: {
    color: theme.palette.error.main,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = withStyles(styles)((props) => {
  const [{ modal }, dispatch] = useStateValue();

  if (!modal) {
    return null;
  }

  const { actions, content, title } = modal;

  function onClose() {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null,
    });
  }

  return (
    <Dialog
      open={!!modal}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {!!title && <DialogTitle>{title}</DialogTitle>}
      {!!content && <DialogContent>{content}</DialogContent>}

      <DialogActions>
        {!!actions &&
          !!actions.length &&
          actions.map((action, index) => {
            const { color, label, variant, onClick } = action;

            return (
              <ModalButton
                key={index}
                label={label}
                color={color}
                variant={variant}
                onClick={onClick}
              />
            );
          })}
        {(!actions || !actions.length) && (
          <ModalButton label={<FormattedMessage id="general.close" />} />
        )}
      </DialogActions>
    </Dialog>
  );
});

export default Modal;
