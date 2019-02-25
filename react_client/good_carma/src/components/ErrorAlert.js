import React from "react";
import { UncontrolledAlert } from "reactstrap";

const ErrorAlert = (props) => {
  return(
    <UncontrolledAlert color="info">
      {props.message}
    </UncontrolledAlert>
  )
}

export default ErrorAlert;