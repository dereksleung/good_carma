import React, { Component } from "react";
import { Post } from "../requests";
import { Link } from "react-router-dom";
import { Inspire } from "../requests";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";

class UserSinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      post: props.post,
      currentUser: props.currentUser
    };

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
          <section className="post-body mb-3">
            <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.ia_user_fullname}
            </Link>
            <span>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.inspire_count} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              
            </span>
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              <img className="postpic mb-3" src={post.picture_url} />
            </Link>  
            
          </section>
        </article>
      )
    }
    if (post.color === "silver") {
      return(
        <article className="SinglePost silver border border-white rounded m-2 p-3">
          <section className="post-body mb-3">
            <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.ia_user_fullname}
            </Link>
            <span>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.inspire_count} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              
            </span>
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              <img className="postpic mb-3" src={post.picture_url} />
            </Link>  
            
          </section>
      </article>
      )
    }
    return(
      <article className="SinglePost border border-white rounded m-2 p-3">
        <section className="post-body mb-3">
          <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.ia_user_fullname}
          </Link>
          <span>
            {`${post.created_at}  `}
            {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
            {post.gold_inspires > 0 ? `${post.inspire_count} Gold Inspires  ` : ""}
            {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
            
          </span>
          <Link to={`posts/${post.id}`}> 
            <p>{post.body}</p>
            <img className="postpic mb-3" src={post.picture_url} />
          </Link>  

          <CommentList comments={post.comments}/>
            
        </section>
      </article>
    )
  }

}

export default UserSinglePost;