import React, { Component } from "react";
import { Quest } from "../requests";
import NewQuestForm from "./NewQuestForm";
import { Container, Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Button } from "reactstrap";

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
    return (
      <Container className="QuestIndex pt-4">
        <NewQuestForm />
        <CardDeck>
          {quests.map(quest=>{
            return(
              <Card>
                <CardImg top width="100%" src={`${quest.image}`}/>
                <CardBody>
                  <CardTitle>{quest.title}</CardTitle>
                  <CardText>{quest.description}</CardText>
                  <Button>Start Quest</Button>
                </CardBody>
              </Card>
            )
          })}
        </CardDeck>
      </Container>
    )
  }
}

export default QuestIndex;