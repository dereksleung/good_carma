import React, { Component } from "react";
import { Post, LeaderBoard, Follow } from "../requests";
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
      togglePostForm: false
    }
  
    // this.deletePost = this.deletePost.bind(this);
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.clearParentIDs = this.clearParentIDs.bind(this);
    this.showNewPost = this.showNewPost.bind(this);
    this.togglePostForm = this.togglePostForm.bind(this);
    this.updateFollowButton = this.updateFollowButton.bind(this);
    this.createFollow = this.createFollow.bind(this);
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
    <Container className="PostIndexPage d-flex mt-5">
      <section className="column-1 flex-grow-3 mr-2">
        <UserBasicStats {...currentUser}/> 
      </section>
      
      <section className="column-2 PostFeed flex-grow-6 d-flex flex-column align-content-stretch">
        <PostForm parentIDs={this.state.parentIDs} clearParentIDs={this.clearParentIDs} showNewPost={this.showNewPost} >
        </PostForm>
        <Modal isOpen={this.state.togglePostForm} toggle={this.togglePostForm}>
        </Modal> 
        {posts.map(post=>(
            <section key={post.slug} data-slug={post.slug}>
              <SinglePost post={post} postId={post.slug} currentUser={currentUser} avatar_image={post.user.avatar_image}>
                <Button active className="inspiraction-btn" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.slug, e)}>Inspiraction - You inspired me to do something!</Button>

              </SinglePost>
            </section>
        ))}
      </section>

      <section className="column-3 flex-grow-3 ml-2">
        <NewcomersPanel new_posters={new_posters} arr_two_wk={arr_two_wk} />
      </section>
    </Container> 
    )
  }

}

export default PostIndexPage;