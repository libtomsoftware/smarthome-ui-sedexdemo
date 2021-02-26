import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../../providers/state";
import * as eventTypes from "../../actions/event-types";

const { EVENT } = eventTypes;

const ModalButton = props => {
  const { color, label, variant, onClick } = props;
  const [, dispatch] = useStateValue();

  function closeDialog() {
    dispatch({
      type: EVENT.MODAL_STATE_UPDATE,
      modal: null
    });
  }

  return (
    <Button
      onClick={onClick || closeDialog}
      color={color || "primary"}
      variant={variant || "text"}
    >
      {label || <FormattedMessage id="general.close" />}
    </Button>
  );
};

export default ModalButton;
