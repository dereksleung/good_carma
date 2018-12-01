import React, { Component } from "react";
import { Post } from "../requests";
import { Link } from "react-router-dom";

class PostIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: []
    }
  
    // this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    Post.all().then(posts=>{
      this.setState({
        posts: posts,
        loading: false
      });
    });
  }

  render() {
    const { posts } = this.state;

    return(
    <main className="PostIndexPage">
      <h1>Post Index</h1>
      {posts.map(post=>(
        <section key={post.id}>
          <p>{post.body}</p>
          <img src={post.picture_url} />
        </section>
      ))
      }
    </main> 
    )
  }

}

export default PostIndexPage;