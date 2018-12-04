import React, { Component } from "react";
import { Post } from "../requests";
import { Link, Redirect } from "react-router-dom";

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

  handleClickCheckbox(id, e) {

    const { parentIDs } = this.state;
    if (parentIDs.length >= 0 && parentIDs.length < 4) {
      const allParentIDs = this.state.parentIDs.push(id);
      this.setState({
        parentIDs: allParentIDs
      })
      console.log(parentIDs);
    }
  }

  render() {
    const { posts, currentUser } = this.state;

    return(
    <main className="PostIndexPage">
      <h1>Post Index</h1>
      <PostForm parentIDs={this.state.parentIDs}>
      </PostForm>  
      {posts.map(post=>(
        <section key={post.id} data-id={post.id}>
          <SinglePost {...post} currentUser={currentUser}>
            <input type="checkbox" onClick={(e)=>this.handleClickCheckbox(post.id, e)}>
            </input>
          </SinglePost>
        </section>
      ))
      }
    </main> 
    )
  }

}

export default PostIndexPage;