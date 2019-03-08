import React, { Component } from "react";
import { Post, LeaderBoard, Follow, Comment } from "../requests";
import { Container, Row, Col, Button, Modal } from "reactstrap";
import InstructionPopover from "./InstructionPopover";
import SinglePost from "./SinglePost";
import NewcomersPanel from "./NewcomersPanel";
import UserBasicStats from "./UserBasicStats";
import PostForm from "./PostForm";

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
      let allPosts;

      // I use the message property as an error message, which I may have customized for user experience the API.
      if (updatedPost.hasOwnProperty("message")) {
        allPosts = posts.map((prevPost) => {
          if (updatedPost.slug === prevPost.slug) {
            let prevPostWithErrs = Object.assign({},prevPost);
            prevPostWithErrs.message = updatedPost.message;
            return prevPostWithErrs;
          } else {
            return prevPost;
          }
        })
      } else {
        allPosts = posts.map((prevPost) => {
          if (updatedPost.slug === prevPost.slug) {
            return updatedPost;
          } else {
            return prevPost;
          }
        })
      }

      return {
        ...restState,
        posts: allPosts
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
    if (parentIDs.length >= 0 && parentIDs.length < 4 && parentIDs.includes(id) === false) {
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
      });

    currentTarget.reset();
  }

  togglePostForm() {
    this.setState({
      togglePostForm: !this.state.togglePostForm
    })
  }

  createFollow(user_id) {
    Follow.create(user_id)
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
                    <InstructionPopover instructions="You can click these Inspiraction buttons on up to three posts before you submit your own post with the Post button at the top. Your new post will be part of their trees, and this shows people their actions helped move you to do something yourself, one of the best kinds of feedback to get!">
                      <Button active className="inspiraction-btn" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.slug, e)}>Inspiraction</Button>
                    </InstructionPopover>
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