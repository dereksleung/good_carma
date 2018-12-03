import React, { Component } from "react";
import { LeaderBoard } from "../requests";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';

class LeaderBoardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    LeaderBoard.loadMain().then(data=>
      this.setState({
        new_posters: data.new_posters
      }))
  }

  render() {
    const { new_posters } = this.state;

    return(
      <article className="LeaderBoardMain">
        <h1>These people are worth congratulating!</h1>
        <ListGroup>
        {new_posters.map(user=>{
          return(
            <ListGroupItem>
              {`${user.first_name}`}
            </ListGroupItem>
          )
        })
        }
        </ListGroup>
      </article>
    )
  }

}

export default LeaderBoardMain;