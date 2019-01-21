import React, { Component } from "react";
import { Post } from "../requests";
import { Link } from "react-router-dom";
import { Inspire } from "../requests";
import PostInspireButtonForm from "./PostInspireButtonForm";
import CommentList from "./CommentList";
import { Button, Collapse, UncontrolledAlert } from "reactstrap";
import EditPostForm from "./EditPostForm";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthrzd: false,
      post: props.post,
      currentUser: props.currentUser,
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
    const { currentUser } = this.state;
    const { post } = this.state;

    if (post.color === "gold") {
      return(
        <article className="SinglePost gold border border-blue p-3">
          {post.errors ?
            <UncontrolledAlert color="info">{post.errors.message}</UncontrolledAlert>  
          : ""
          }
          <section className="post-body mb-3">
            <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.p_user_full_name}
            </Link>
            <span>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.gold_inspires} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              
            </span>
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              {post.image ? <img className="postpic mb-3" src={post.image} style={{maxWidth:"100%"}} /> : ""
              }
            </Link>  
            <div>
              <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
              <Button>
                <Link to={{pathname:`posts/${post.id}/tree`, state: {postId: post.id}}}>
                Tree
                </Link>
              </Button>
              {this.props.children}
            </div>
            {currentUser.slug === post.p_user_id ? 
              <>
                <Button onClick={this.toggleCollapseEditPostForm}>Edit
                </Button> 
                <Collapse isOpen={this.state.collapseEditPostForm}>
                  <EditPostForm body={post.body} picture_url={post.picture_url} id={post.id} updateAfterEdit={this.updateAfterEdit} />
                </Collapse>
              </>
            :
              ""
            }
          </section>
        <h6>Comments</h6>
        {Array.isArray(post.comments) || post.comments.length ? <CommentList comments={post.comments} /> : ""
        }
      
        </article>
      )
    }
    if (post.color === "silver") {
      return(
        <article className="SinglePost silver border border-blue p-3">
          {post.errors ?
            <UncontrolledAlert color="info">{post.errors.message}</UncontrolledAlert>  
          : ""
          }
          <section className="post-body mb-3">
            <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.p_user_full_name}
            </Link>
            <span>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.gold_inspires} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              
            </span>
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              {post.image ? <img className="postpic mb-3" src={post.image} style={{maxWidth:"100%"}} /> : ""
              }
            </Link>  
            <div>
              <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
              <Button>
                <Link to={{pathname:`posts/${post.id}/tree`, state: {postId: post.id}}}>
                Tree
                </Link>
              </Button>
              {this.props.children}
            </div>
            {currentUser.slug === post.p_user_id ? 
              <>
                <Button onClick={this.toggleCollapseEditPostForm}>Edit
                </Button> 
                <Collapse isOpen={this.state.collapseEditPostForm}>
                  <EditPostForm body={post.body} picture_url={post.picture_url} id={post.id} updateAfterEdit={this.updateAfterEdit} />
                </Collapse>
              </>
            :
              ""
            }
          </section>
          {Array.isArray(post.comments) || post.comments.length ? <CommentList comments={post.comments} /> : ""
          }
      
        </article>
      )
    }
    return(
      
        <article className="SinglePost border border-blue p-3">
          {post.errors ?
            <UncontrolledAlert color="info">{post.errors.message}</UncontrolledAlert>  
          : ""
          }
          <section className="post-body mb-3">

            <Link className="mr-2" to={`/users/${post.p_user_id}`}>{post.p_user_full_name}
            </Link>
            <span>
              {`${post.created_at}  `}
              {post.inspire_count > 0 ? `${post.inspire_count} Inspires  ` : ""}
              {post.gold_inspires > 0 ? `${post.gold_inspires} Gold Inspires  ` : ""}
              {post.silver_inspires > 0 ? `${post.silver_inspires} Silver Inspires  ` : ""}
              
            </span>
            <Collapse isOpen={this.state.collapseEditPostForm}>
            <strong>Current</strong>
            </Collapse>
            <Link to={`posts/${post.id}`}> 
              <p>{post.body}</p>
              {post.image ? <img className="postpic mb-3" src={post.image} style={{maxWidth:"100%"}} /> : ""
              }
            </Link>  
            <div>
              <PostInspireButtonForm postId={post.id} level={currentUser ? currentUser.level : null} handleSubmit={this.hndlInspireBtnSbmt} />
              <Button>
                <Link to={{pathname:`posts/${post.id}/tree`, state: {postId: post.id}}}>
                  Tree
                </Link>
              </Button>
              {this.props.children}
            </div>
            {currentUser.slug === post.p_user_id ? 
              <>
                <Button onClick={this.toggleCollapseEditPostForm}>Edit
                </Button> 
                <Collapse isOpen={this.state.collapseEditPostForm}>
                  <EditPostForm body={post.body} picture_url={post.picture_url} id={post.id} updateAfterEdit={this.updateAfterEdit} />
                </Collapse>
              </>
            :
              ""
            }
          </section>
          {Array.isArray(post.comments) || post.comments.length ? <CommentList comments={post.comments} /> : ""
          }
        </article>
      
    )
  }

}

export default SinglePost;