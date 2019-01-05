import React from "react";
import "./WelcomePage.css";
import volunteers from "./Volunteers-med.jpeg";
import { Container, Row, Col } from "reactstrap";

const WelcomePage = props => {

  return(
    <Container className="WelcomePage">
      {/* <img src={volunteers} style={{visibility:"hidden"}}></img> */}
      <h1 className="hero-text text-white">
        Here, what goes around doesn't just come around. We help you multiply the goodness everywhere.
      </h1>
    </Container>
  )
}

export default WelcomePage;