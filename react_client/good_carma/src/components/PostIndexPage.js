import React, { Component } from "react";
import { Post } from "../requests";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import SinglePost from "./SinglePost";
import PostInspireButtonForm from "./PostInspireButtonForm";


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
      currentUser: props.currentUser
    }
  
    // this.deletePost = this.deletePost.bind(this);
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.clearParentIDs = this.clearParentIDs.bind(this);
    this.showNewPost = this.showNewPost.bind(this);
  }

  componentDidMount() {
    Post.all().then(posts=>{
      this.setState({
        posts: posts,
        loading: false,
        redirect: false
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
      allParentIDs.push(id)
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


  render() {
    const { posts, currentUser } = this.state;

    return(
    <Container className="PostIndexPage d-flex">
      <section className="column-1 flex-grow-3">
      
      </section>
      
      <section className="PostFeed flex-grow-6 d-flex flex-column align-content-stretch">
        <PostForm parentIDs={this.state.parentIDs} clearParentIDs={this.clearParentIDs} showNewPost={this.showNewPost} >
        </PostForm> 
        {posts.map(post=>(
          <Row>
            <section key={post.id} data-id={post.id}>
              <SinglePost post={post} postId={post.id} currentUser={currentUser}>
                <Button active className="mt-2" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.id, e)}>Inspiraction - You inspired me to do something!</Button>

              </SinglePost>
            </section>
          </Row>
        ))}
      </section>

      <section className="column-3 flex-grow-3">
      </section>
    </Container> 
    )
  }

}

export default PostIndexPage;