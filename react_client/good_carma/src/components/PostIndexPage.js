import React, { Component } from "react";
import { Post, LeaderBoard, Follow, Comment } from "../requests";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import SinglePost from "./SinglePost";
import NewcomersPanel from "./NewcomersPanel";


import UserBasicStats from "./UserBasicStats";
import PostForm from "./PostForm";
import CommentList from "./CommentList";

class PostIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: [],
      redirect: false,
      parentIDs: [],
      newcomers: {},
      togglePostForm: false,
      errors: []
    }
  
    // this.deletePost = this.deletePost.bind(this);
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.clearParentIDs = this.clearParentIDs.bind(this);
    this.showNewPost = this.showNewPost.bind(this);
    this.togglePostForm = this.togglePostForm.bind(this);
    this.updateFollowButton = this.updateFollowButton.bind(this);
    this.createFollow = this.createFollow.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.updateAfterEdit = this.updateAfterEdit.bind(this);
  }

  componentDidMount() {
    Post.all().then(posts=>{
      this.setState({
        posts: posts,
        loading: false,
        redirect: false
      });
    });
    LeaderBoard.loadMain().then(newcomers=>{
      this.setState({
        newcomers: newcomers
      });
    });  
  }

  updateAfterEdit(updatedPost) {
    this.setState((prevState)=>{
      const { posts, ...restState } = prevState;
      let updatedPosts;

      if (updatedPost.hasOwnProperty("message")) {
        updatedPosts = posts.map((prevPost) => {
          if (updatedPost.slug === prevPost.slug) {
            let prevPostWithErrs = Object.assign({},prevPost);
            prevPostWithErrs.message = updatedPost.message;
            return prevPostWithErrs;
          } else {
            return prevPost;
          }
        })
      } else {
        updatedPosts = posts.map((prevPost) => {
          if (updatedPost.slug === prevPost.slug) {
            return updatedPost;
          } else {
            return prevPost;
          }
        })
      }

      return {
        ...restState,
        posts: updatedPosts
      }
    })
  }

  
  clearParentIDs() {
    this.setState({
      parentIDs: []
    })
  }

  handleClickCheckbox(id, e) {

    const { parentIDs } = this.state;
    if (parentIDs.length >= 0 && parentIDs.length < 4 && parentIDs.includes(id) == false) {
      const allParentIDs = this.state.parentIDs;
      allParentIDs.push(id);
      this.setState({
        parentIDs: allParentIDs
      })
      console.log(parentIDs);
    }
  }

  showNewPost() {
    Post.all()
      .then(res=>{
        this.setState({
          posts: res  
        })
      })  
  }

  submitComment(event, postSlug) {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Comment
      .create({
        body: formData.get("body")
      }, postSlug)
      .then(res=>{
        this.showNewPost();
        this.clearParentIDs();        
      })
      
      // this.setState((prevState, props)=>{
      //   const posts = prevState.posts.map((post, ind)=>{
      //     if (post.slug === res.p_slug) {
      //       post.comments = [...post.comments, res]
      //     }
      //   })
      //   return { posts: posts };
      // }) 
        
      ;
      // CommentUpdate(event, slug)

      // .then(res=>{
      //   this.setState((prevState, props)=>{
      //     const posts = prevState.posts.map((post, ind)=>{
      //       post.comments.map(comm=>{
      //         if (comm.slug === slug) {
      //           comm = res;
      //         }
      //       })
      //     })
      //   return { posts };
      //   }) 
        
      // });
    currentTarget.reset();
  };


  togglePostForm() {
    this.setState({
      togglePostForm: !this.state.togglePostForm
    })
  }

  createFollow(user_id) {
    Follow.create(user_id)
      // .then(LeaderBoard.loadMain())
      .then(data=>{
        this.setState({
          newcomers: data
        })
      });
  }

  updateFollowButton(userData) {
    this.setState({
      newcomers: userData
    })
  }

  render() {
    const { posts } = this.state;
    const { currentUser } = this.props;
    const { newcomers: { new_posters, arr_two_wk } } = this.state;

    if (this.state.loading) {
      return(
        <h1>Loading...</h1>
      )
    }

    return(
      <Container className="PostIndexPage pt-5">
        <Row>
          <Col className="col-8 col-lg-4">
            <UserBasicStats {...currentUser}/>
            <NewcomersPanel new_posters={new_posters} arr_two_wk={arr_two_wk} /> 
          </Col>
          <Col className="PostFeed col-sm-8 col-lg-6" style={{width: "100%"}}>
            <PostForm parentIDs={this.state.parentIDs} clearParentIDs={this.clearParentIDs} showNewPost={this.showNewPost} >
            </PostForm>
            <Modal isOpen={this.state.togglePostForm} toggle={this.togglePostForm}>
            </Modal> 
            {posts.map(post=>(
                <section key={post.slug} data-slug={post.slug}>
                  <SinglePost post={post} postId={post.slug} currentUser={currentUser} avatar_image={post.user.avatar_image} submitComment={this.submitComment} updateAfterEdit={this.updateAfterEdit} >
                    <Button active className="inspiraction-btn" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.slug, e)}>Inspiraction</Button>

                  </SinglePost>
                </section>
            ))}
          </Col>
        </Row>
      </Container> 
    )
  }

}

export default PostIndexPage;