import React from "react";
import "./WelcomePage.css";
import volunteers from "./volunteers.jpeg";
import { Container, Row, Col } from "reactstrap";
import PopoverImageWithCredit from "./PopoverImageWithCredit";
import landingTree from "./TreeLanding.png";
import trophyHand from "./TrophyHand.jpg";
import lightbulb from "./LightbulbHand.jpg";

const WelcomePage = props => {

  return(
    <main className="WelcomePage" style={{backgroundImage: `url(${volunteers}), linear-gradient(0deg, rgba(8,174,234,1) 0%, rgba(42,245,152,1) 100%), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundBlendMode: "multiply",
    backgroundRepeat:"no-repeat",
    height: "100vh",
    backgroundPosition:"center",
    position: "relative"}}>
      <Container className="background-splash">
      {/* <img src={volunteers} style={{visibility:"hidden"}}></img> */}
        
        <Row className="hero-text">
          <Col className="col-1 col-md-1">
          </Col>
          <Col className="col-md-9"> 
            <h1 className="text-white">
              See Good. 
            </h1>
            <br/>
            <h1 className="text-white">
              Do Good. 
            </h1>
            <br/>
            <h1 className="text-white">
              Feel Good. 
            </h1>
            <br/>
            <p>
            Causes are hard work, and you can’t always encourage volunteers, or sustain their engagement and motivation by yourself. 
            Good Carma harnesses the power of good company, and the reward factors of acknowledgement and gamification to boost volunteer involvement.
            </p>
          </Col>
        </Row> 
       
      </Container>
      <Container className="featurettes" style={{padding: "4rem 2rem", minWidth: "100vw", margin: "0" }}>
      <Row>
        <Col className="featurette col-12 col-lg-4">
          <PopoverImageWithCredit credUrl="https://www.freepik.com/free-photos-vectors/technology" credName="Technology vector created by rawpixel.com - www.freepik.com"
          >
            <img className="landing-img" src={lightbulb} alt="hand holding lightbulb switched on" />  
          </PopoverImageWithCredit>
          <h2>Inspire and Get Inspired</h2>
          <p>With an <strong>Inspire</strong>, tell people they inspired you. Even better, with an <strong>Inspiraction</strong>, tell people what they did helped make you do something yourself. Get inspired by immersing in the good things others in your organization are doing, and spending time with good people. Keep up with newcomers and people who you might not normally see.</p>
        </Col>
        <Col className="featurette col-12 col-lg-4">
          <PopoverImageWithCredit 
            credUrl="https://www.freepik.com/free-photos-vectors/business" 
            credName="Business vector created by makyzz - www.freepik.com"
          >
            <img className="landing-img" alt="hand holding trophy" src={trophyHand}/>
          </PopoverImageWithCredit>
          <h2>Earn Achievements</h2>
          <p>See personal milestones in your activity and the effect you have on other people.</p>
          
        </Col>
        <Col className="featurette col-12 col-lg-4">
          <PopoverImageWithCredit   
            credUrl="https://www.freepik.com/free-photos-vectors/flower"    
            credName="Flower vector created by freepik - www.freepik.com"
          >
            <img className="landing-img" src={landingTree} alt="small simplified tree with circular bush of leaves" style={{height: "200px"}} /> 
          </PopoverImageWithCredit>
          <h2>See Your Tree Grow</h2>
          <p>Relax and look at the tree of activity sprouting from your posts.</p>
        </Col>
      </Row>
      </Container>
    </main>
  )
}

export default WelcomePage;