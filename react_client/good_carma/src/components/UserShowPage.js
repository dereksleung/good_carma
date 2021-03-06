import React, { Component } from "react";
import SinglePost from "./SinglePost";
import { User, Follow } from "../requests";
import { Container, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import PictureUploadForm from "./PictureUploadForm";

class UserShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
      parentIDs: [],
      currentUser: props.currentUser,
      toggleSplashUploadModal: false,
      toggleAvatarUploadModal: false
    };

    this.toggleAvatarUploadModal = this.toggleAvatarUploadModal.bind(this);
    this.toggleSplashUploadModal = this.toggleSplashUploadModal.bind(this);
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.createFollow = this.createFollow.bind(this);
    this.destroyFollow = this.destroyFollow.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    User
      .show(id)
      .then(res=>{
        this.setState({
          user: res,
          loading: false
        });
      })

    Follow.check(id)
      .then(res=>{
        this.setState((prevState, props)=>{
          return {
            ...prevState,
            followed: res.followed,
            follow_id: res.follow_id
          }
        });
      });
  }

  toggleSplashUploadModal() {
    this.setState({
      toggleSplashUploadModal: !this.state.toggleSplashUploadModal
    })
  }

  toggleAvatarUploadModal() {
    this.setState({
      toggleAvatarUploadModal: !this.state.toggleAvatarUploadModal
    })
  }

  handleClickCheckbox(id, e) {

    const { parentIDs } = this.state;
    if (parentIDs.length >= 0 && parentIDs.length < 4 && parentIDs.includes(id) === false) {
      const allParentIDs = this.state.parentIDs;
      allParentIDs.push(id)
      this.setState({
        parentIDs: allParentIDs
      })
      console.log(parentIDs);
    }
  }

  createFollow() {
    Follow.create(this.state.user.slug)
      .then(userInfo=>{
        this.setState((prevState, props)=>({
        ...prevState,
          followed: userInfo.followed,
          follow_id: userInfo.follow_id
        }))
      })
  }

  destroyFollow() {
    Follow.destroy(this.state.follow_id)
      .then(res=>this.setState({
        followed: false,
        follow_id: null
      }))
  }

  render() {

    if (this.state.loading) {
      return(
        <div className="UserShowPage">
          <h2>Loading...</h2>
        </div>
      )
    }

    const { user, currentUser } = this.state;
    const id = this.props.match.params.id;

    return(
      <section className="UserShowPage">
        <section className="personal-splash-container" style={{position: "relative"}}>
          <section className="personal-splash-image" 
            onClick={this.toggleSplashUploadModal}
            style={{
              backgroundColor: "#03A9F4",
              backgroundImage: `url(${user.splash_image})`,
              backgroundSize: "cover",
              minWidth: "100%",
              minHeight: "30vh",
              maxHeight: "50vh"
            }} 
          >
            <Modal isOpen={this.state.toggleSplashUploadModal} toggle={this.toggleSplashUploadModal}>
              <ModalHeader toggle={this.toggleSplashUploadModal}>
                Upload an Image
              </ModalHeader>
              <ModalBody>
                <PictureUploadForm id={user.slug} image_type="splash"></PictureUploadForm>
              </ModalBody>              
            </Modal>

          </section>
          <section style={{
            position: "relative",
            backgroundColor: "white",
            minWidth: "100%",
            height: "10vh"
          }}>

            <Container className="d-flex flex-row">
              
              <section className=""
                style={{
                position: "relative",
                display: "inline-block",
                top: "-12vh",
                height: "25vh",
                width: "25vh",
                maxHeight: "240px",
                maxWidth:"240px",
                backgroundColor: "#03A9F4",
                backgroundImage: `url(${user.avatar_image})`,
                backgroundSize: "contain",
                borderStyle: "solid",
                borderColor: "white",
                borderRadius: "100%"
              }} onClick={this.toggleAvatarUploadModal}>
                <Modal isOpen={this.state.toggleAvatarUploadModal} toggle={this.toggleAvatarUploadModal}>
                  <ModalHeader toggle={this.toggleAvatarUploadModal}>
                    Upload an Image
                  </ModalHeader>
                  <ModalBody>
                    <PictureUploadForm id={user.slug} image_type="avatar"></PictureUploadForm>
                  </ModalBody>              
                </Modal>
              </section>

              <section className="d-flex flex-grow-1">
                <section className="d-flex flex-grow-1 justify-content-end">
                  <Link className="d-flex flex-column align-items-center" to={`/users/${id}/followers`}>
                    <section className=""><small>Followers</small></section>
                    <section>{user.followers_count}</section> 
                  </Link>
                </section>

                <section className="d-flex flex-grow-1 justify-content-end">
                  <Link className="d-flex flex-column align-items-center" to={`/users/${id}/followed_users`} >
                    <section className="align-content-around"><small>Followed Users</small>
                    </section>
                    <section>{user.followed_users_count}</section> 
                  </Link>
                </section>
                
                <section className="d-flex flex-grow-1 justify-content-end">
                  <section className="d-flex flex-column align-items-center">
                    <section><small>Inspiractions</small></section>
                    <section>{user.child_post_count}</section>
                  </section>
                </section>
              </section>
            </Container>
          </section>
        </section>
        
        <Container className="UserDetails mt-4">
          <section className="d-flex">
            <section className="flex-grow-1 mr-2">
              <section className="p-3 mb-2 bg-white">
                <h5>{user.full_name}</h5>
                {this.state.followed ? 
                  <button onClick={this.destroyFollow} className="btn btn-primary btn-sm" style={{borderRadius: "24px"}}>Unfollow</button>
                :
                  <button onClick={this.createFollow} className="btn btn-primary btn-sm" style={{borderRadius: "24px"}}>Follow</button>
                }

              </section>
              <div className="allBadges SinglePost p-3">
              <p>Badges</p>
                {user.badges.map(badge=>(
                  
                  <img className="m-2" src={badge.image_url} title={badge.name}>
                  </img>
                ))}
              </div>
            </section>
            <section className="flex-grow-2">
              {user.posts.map(post=>(
                <section key={post.slug} data-id={post.slug}>
                  <SinglePost post={post} postId={post.slug} currentUser={currentUser} avatar_image={user.avatar_image}>
                    <Button active className="" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.slug, e)}>Inspiraction - You inspired me to do something!
                    </Button>
                  </SinglePost>
                </section> 
              ))}
            </section>
          </section>
        </Container>
      </section>
    )
  }
}

export default UserShowPage;