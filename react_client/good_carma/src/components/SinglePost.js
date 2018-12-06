import React, { Component } from "react";
import { Post } from "../requests";
import { Link } from "react-router-dom";
import { Inspire } from "../requests";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      post: props.post,
      currentUser: props.currentUser
    }

    this.hndlInspireBtnSbmt = this.hndlInspireBtnSbmt.bind(this);
  }

  componentDidMount() {
    // If receive json ok from controller, then render post. If receive json unauthorized status, then render an unauthorized route using isAuthrzd state as if-condition.

    // const id = this.props.match.params.id;

  }

  hndlInspireBtnSbmt(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Inspire.createPostInsp({
      inspiring_entry_type: formData.get("inspiring_entry_type"),
      postId: this.props.postId,
      color: formData.get("color")
    }).then(res=>this.setState({
      post: res
    }));

    currentTarget.reset();
  
  };

  render() {

    if (currentUser) {

      const level = this.state.currentUser.level || null;
      console.log('sending level', currentUser.level);
    }
    const { currentUser } = this.state;
    const { post } = this.state;

    if (post.color === "gold") {
      return(
        <article className="SinglePost gold border border-white rounded m-2 p-3">
        <section className="post-body">
            {post.children}
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              <img src={post.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
        </section>
        <CommentList comments={post.comments} />
      
        </article>
      )
    }
    if (post.color === "silver") {
      return(
        <article className="SinglePost silver border border-white rounded m-2 p-3">
        <section className="post-body">
            {post.children}
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              <img src={post.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
        </section>
        <CommentList comments={post.comments} />
      
      </article>
      )
    }
    return(
      <article className="SinglePost border border-white rounded m-2 p-3">
        <section className="post-body">
            {post.children}
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              <img src={post.picture_url} />
            </Link>  
            <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
        </section>
        <CommentList comments={post.comments} />
      
      </article>
    )
  }

}

export default SinglePost;