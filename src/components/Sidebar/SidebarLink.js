import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export const SidebarLink = (props) => {
  const { label, to, icon, faIcon, isHidden } = props;

  if (isHidden) {
    return null;
  }

  return (
    <ListItem button component={Link} to={to}>
      {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
      {!!faIcon && (
        <ListItemIcon>
          <i className={`fas fa-${faIcon}`}></i>
        </ListItemIcon>
      )}
      <ListItemText primary={label} />
    </ListItem>
  );
};
