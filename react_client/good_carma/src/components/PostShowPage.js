import React, { Component } from "react";
import { Post } from "../requests";

import SinglePost from "./SinglePost";

class PostShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      post: null
    }
  }

  componentDidMount() {
    // If receive json ok from controller, then render post. If receive json unauthorized status, then render an unauthorized route using isAuthrzd state as if-condition.

    const id = this.props.match.params.id;
    Post.one(id)
      .then(p=>{
        console.log(p);

        this.setState({
          loading: false,
          post: p
        })
      })
  }



  render() {
    return(
      <article className="PostShowPage">
        <SinglePost post={this.state.post} />
      
      </article>
    )
  }

}

export default PostShowPage;