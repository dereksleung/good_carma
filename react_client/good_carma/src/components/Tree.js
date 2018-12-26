import React, { Component } from "react";
import { Post } from "../requests";
import Branch from "./Tree/branch.svg";

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tree: {}
    }
  }

  componentDidMount() {
    const startPostId = this.props.match.params.id;
    Post.tree(startPostId)
      .then(res=>{
        this.setState({
          tree: res,
          loading: false
        })
      })
  }

  render() {
    const { tree } = this.state;

    if (this.state.loading) {
      return(
        <h3>Loading...</h3>
      )
    }

    return(
      <section className="tree" style={{
        position: "relative", 
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "white",
        mixBlendMode: "normal"
      }}>
        <section className="branch">
          <img src={Branch}>
          </img>
        </section>
      </section>
    )
  }
}

export default Tree;
