import React from "react";
import "./WelcomePage.css";
import volunteers from "./volunteers.jpeg";
import { Container, Row, Col } from "reactstrap";

const WelcomePage = props => {

  return(
    <main className="WelcomePage" style={{backgroundImage: `url(${volunteers}), linear-gradient(0deg, rgba(8,174,234,1) 0%, rgba(42,245,152,1) 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundBlendMode: "multiply",
    backgroundRepeat:"no-repeat",
    height: "100vh",
    backgroundPosition:"center",
    position: "relative"}}>
      <Container className="background-splash" >
      {/* <img src={volunteers} style={{visibility:"hidden"}}></img> */}
        
          
          <h1 className="hero-text text-white">
            Here, what goes around doesn't just come around. We help you multiply the goodness everywhere.
          </h1>
        
       
      </Container>
      <Container>
      <Row>
        <Col className="col-12 col-lg-4">
          <h1>See Good.</h1>
          <p>We know causes are hard work and we can all use a lift. Get immersed and inspired by the good things others in your organization are doing. Find out what others you don't normally talk to are doing.</p>
        </Col>
        <Col className="col-12 col-lg-4">
          <h1>Do Good.</h1>
          <p>Post a development or plan you think others would encourage others.</p>
          <p></p>
        </Col>
        <Col className="col-12 col-lg-4">
          <h1>Feel Good.</h1>
          <p>With an Inspire, tell people they inspired you. Even better, with an Inspiraction, tell people what they did helped make you do something yourself.</p>
          <p>Get noticed, and show people you noticed what they're up to!</p>
          <p>Earn badges, and recognition on the leaderboards. And relax and with the tree of activity sprouting from your post.</p>
        </Col>
      </Row>
      </Container>
    </main>
  )
}

export default WelcomePage;