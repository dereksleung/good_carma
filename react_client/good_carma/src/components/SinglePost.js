import React, { Component } from "react";
import { Post } from "../requests";
// import PostDetails from "./PostDetails";
import { Link } from "react-router-dom";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      post: null,
      currentUser: props.currentUser
    }
  }

  componentDidMount() {
    // If receive json ok from controller, then render post. If receive json unauthorized status, then render an unauthorized route using isAuthrzd state as if-condition.

    // const id = this.props.match.params.id;

  }



  render() {
    const { currentUser } = this.state;

    if (this.props.color === "gold") {
      return(
        <article className="SinglePost gold">
        <section className="post-body">
            {this.props.children}
            <Link to={`posts/${this.props.id}`}> 
              <p>{this.props.body}</p>
              <img src={this.props.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={this.props.id} level={currentUser ? currentUser.level : null}/>
        </section>
        <CommentList comments={this.props.comments} />
      
      </article>
      )
    }
    if (this.props.color === "silver") {
      return(
        <article className="SinglePost silver">
        <section className="post-body">
            {this.props.children}
            <Link to={`posts/${this.props.id}`}> 
              <p>{this.props.body}</p>
              <img src={this.props.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={this.props.id} level={currentUser ? currentUser.level : null}/>
        </section>
        <CommentList comments={this.props.comments} />
      
      </article>
      )
    }
    return(
      <article className="SinglePost">
        <section className="post-body">
            {this.props.children}
            <Link to={`posts/${this.props.id}`}> 
              <p>{this.props.body}</p>
              <img src={this.props.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={this.props.id} currentUser={currentUser}/>
        </section>
        <CommentList comments={this.props.comments} />
      
      </article>
    )
  }

}

export default SinglePost;