import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Quest } from "../requests";
import NewQuestForm from "./NewQuestForm";
import { Container, Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Button, Row, Col } from "reactstrap";

class QuestIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: [],
      quests: []
    };
  }

  componentDidMount() {
    Quest.all().then(res=>{
      this.setState({
        quests: res 
      })
    })
  }

  render() {
    const { quests } = this.state;
    const editButton = (currentUser, quest) => {
      if (currentUser) {
        if(quest.company.email === this.props.currentUser.email) {  
          return <small><Link to={{
            pathname:`/quests/${quest.slug}/edit`,
            state: {edit: true}
          }}>Edit</Link></small>
        }
      }
    }

    return (
      <Container className="QuestIndex pt-4">
        <NewQuestForm location={this.props.location}/>
          <Row>
          {quests.map(quest=>{
            return(
              
              <Col className="my-3 col-12 col-md-6 col-lg-4">
                <Card>
                  <CardImg top width="100%" src={`${quest.image}`}/>
                  <CardBody>
                    <CardTitle>{quest.title}</CardTitle>
                    {editButton(this.props.currentUser, quest)}
                    <CardText>{quest.description}</CardText>
                    <Button>Start Quest</Button>
                  </CardBody>
                </Card>
              </Col>
              
            )
          })}
          </Row>  
      </Container>
    )
  }
}

export default QuestIndex;