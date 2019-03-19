import React, { Component } from "react";
import { Quest } from "../requests";

class QuestShow extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      quest: {}
    }

  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Quest.one(id)
      .then(res=>{
        this.setState({
          quest: res
        })
      })
  }

  render() {
    return(
      <section className="QuestShow">
      </section>
    )
  }
}

export default QuestShow;
