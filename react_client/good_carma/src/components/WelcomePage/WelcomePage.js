import React from "react";
import "./WelcomePage.css";
import volunteers from "./Volunteers-med.jpeg";
import { Container, Row, Col } from "reactstrap";

const WelcomePage = props => {

  return(
    <Container className="WelcomePage">
      <img src={volunteers}></img>

    </Container>
  )
}

export default WelcomePage;