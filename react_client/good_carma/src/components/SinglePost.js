import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Inspire } from "../requests";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";
import { Collapse, UncontrolledAlert } from "reactstrap";
import EditPostForm from "./EditPostForm";
import UserAvatarSmall from "./UserAvatarSmall";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      collapseEditPostForm: false,
      message: ""
    };

    this.toggleCollapseEditPostForm = this.toggleCollapseEditPostForm.bind(this);
    this.hndlInspireBtnSbmt = this.hndlInspireBtnSbmt.bind(this);
  }

  toggleCollapseEditPostForm() {
    this.setState({
      collapseEditPostForm: !this.state.collapseEditPostForm
    })
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
    
    const { currentUser } = this.props;
    const { post } = this.props;

    if (currentUser) {
      const level = currentUser.level || null;
      console.log('user level', level);
    }
    
    return(
      
      <article className={`SinglePost ${post.color} border border-blue p-3`}>
        {post.hasOwnProperty("message") ?
          <UncontrolledAlert color="info">{post.message}</UncontrolledAlert>  
        : ""
        }
        <section className="post-body mb-3">
          <section className="d-flex align-items-center">
            <Link className="mr-2 d-flex align-items-center" to={`/users/${post.p_user_id}`}>
              <UserAvatarSmall avatar_image={this.props.avatar_image} size={50} />
              <span className="ml-2">{post.p_user_full_name}</span>
            </Link>
            <span style={{fontSize: "0.8rem", color: "gray"}}>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.gold_inspires} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              {currentUser.slug === post.p_user_id ? 
                <>
                  <Link to="#" onClick={this.toggleCollapseEditPostForm}>Edit
                  </Link>
                  <div className="w-100"></div>
                </>
              :""  
              }
            </span>
          </section>

          <p>{post.body}</p>
          {post.image ? <img className="postpic mb-3" src={post.image} style={{maxWidth:"100%"}} alt="Something related to this post"/> : ""
          }

          <div className="d-flex flex-wrap">
            <div className="d-flex justify-content-between">
              <PostInspireButtonForm style={{display: "inline-block"}} postId={post.slug} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
              
              <Link className="btn btn-secondary mr-2" to={{pathname:`/posts/${post.slug}/tree`, state: {postId: post.slug}}}>Tree</Link>
              
              {this.props.children}
            </div>
              
              {currentUser.slug === post.p_user_id ? 
                <Collapse isOpen={this.state.collapseEditPostForm}>
                  <EditPostForm body={post.body} picture_url={post.picture_url} id={post.slug} updateAfterEdit={this.props.updateAfterEdit} />
                </Collapse>
                : ""
              }
            
            <div className="flex-grow-1"></div>
          </div>
        </section>
        {Array.isArray(post.comments) || post.comments.length ? <CommentList comments={post.comments} postId={post.slug} submitComment={this.props.submitComment} /> 
          : ""
        }
      </article>
      
    )
  }

}

export default SinglePost;