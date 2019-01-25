import React, { Component } from "react";
import { Post } from "../requests";
import { Link } from "react-router-dom";
import { Inspire } from "../requests";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";
import { Button, Collapse, UncontrolledAlert } from "reactstrap";
import EditPostForm from "./EditPostForm";
import UserAvatarSmall from "./UserAvatarSmall";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      collapseEditPostForm: false,
    }

    this.toggleCollapseEditPostForm = this.toggleCollapseEditPostForm.bind(this);
    this.hndlInspireBtnSbmt = this.hndlInspireBtnSbmt.bind(this);
    this.updateAfterEdit = this.updateAfterEdit.bind(this);
  }

  componentDidMount() {
    // If receive json ok from controller, then render post. If receive json unauthorized status, then render an unauthorized route using isAuthrzd state as if-condition.

    // const id = this.props.match.params.id;

  }

  toggleCollapseEditPostForm() {
    this.setState({
      collapseEditPostForm: !this.state.collapseEditPostForm
    })
  }

  updateAfterEdit(postData) {
    this.setState((prevState, props) => {
      return {
        post: {
        ...prevState.post,
        ...postData
        }
      }
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

    if (currentUser) {

      const level = this.state.currentUser.level || null;
      console.log('sending level', currentUser.level);
    }
    const { currentUser } = this.props;
    const { post } = this.props;

    return(
      
        <article className={`SinglePost ${post.color} border border-blue p-3`}>
          {post.errors ?
            <UncontrolledAlert color="info">{post.errors.message}</UncontrolledAlert>  
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
              </span>
            </section>
            <Collapse isOpen={this.state.collapseEditPostForm}>
            <strong>Current</strong>
            </Collapse>
            <Link to={`/posts/${post.slug}`}> 
              <p>{post.body}</p>
              {post.image ? <img className="postpic mb-3" src={post.image} style={{maxWidth:"100%"}} /> : ""
              }
            </Link>  
            <div className="d-flex">
              <div className="d-flex justify-content-between">
                <PostInspireButtonForm style={{display: "inline-block"}} postId={post.slug} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
                
                <Link className="btn btn-secondary mr-2" to={{pathname:`/posts/${post.slug}/tree`, state: {postId: post.slug}}}>Tree</Link>
                
                {this.props.children}
              
                {currentUser.slug === post.p_user_id ? 
                  <>
                    <Button onClick={this.toggleCollapseEditPostForm}>Edit
                    </Button> 
                    <Collapse isOpen={this.state.collapseEditPostForm}>
                      <EditPostForm body={post.body} picture_url={post.picture_url} id={post.slug} updateAfterEdit={this.updateAfterEdit} />
                    </Collapse>
                  </>
                :
                  ""
                }
              </div>
              <div className="flex-grow-1"></div>
            </div>
          </section>
          {Array.isArray(post.comments) || post.comments.length ? <CommentList comments={post.comments} postId={post.slug} submitComment={this.props.submitComment} /> : ""
          }
        </article>
      
    )
  }

}

export default SinglePost;