import React from "react";
import Box from "@material-ui/core/Box";
import HttpService from "../services/http";
import { useStateValue } from "./state";

export function HttpServiceProvider(props) {
  const { children } = props;
  const [, dispatch] = useStateValue();

  HttpService.configure(dispatch);

  return <Box>{children}</Box>;
}
