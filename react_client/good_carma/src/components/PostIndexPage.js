import React, { Component } from "react";
import { Post } from "../requests";
import { Link, Redirect } from "react-router-dom";

class PostIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: [],
      redirect: false
    }
  
    // this.deletePost = this.deletePost.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
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

  setRedirect(id) {
    // return <Redirect to={`/posts/${id}`} />
    this.setState({
      redirect: true,
      redirId: id
    })
  }

  rendRedirect() {
    if (this.state.redirect === true) {

      return <Redirect to={`posts/${this.state.redirId}`} />
    }
  }

  render() {
    const { posts } = this.state;

    return(
    <main className="PostIndexPage">
      {this.rendRedirect()}
      <h1>Post Index</h1>
      <br></br>
      <br></br>
      <br></br>
      {posts.map(post=>(
        <Link to={`posts/${post.id}`}> 
          <section key={post.id}>
            {/* <button onClick={this.setRedirect(post.id)}>See Entire Post</button> */}
              <p>{post.body}</p>
              <img src={post.picture_url} />
          </section>
        </Link> 
      ))
      }
    </main> 
    )
  }

}

export default PostIndexPage;