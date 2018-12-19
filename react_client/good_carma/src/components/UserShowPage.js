import React, { Component } from "react";
import UserSinglePost from "./UserSinglePost";
import SinglePost from "./SinglePost";
import { User } from "../requests";
import { Container, Row, Button } from "reactstrap";

class UserShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
      parentIDs: [],
      currentUser: props.currentUser
    }

    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
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

  render() {

    if (this.state.loading) {
      return(
        <div className="UserShowPage">
          <h2>Loading...</h2>
        </div>
      )
    }

    const { user, currentUser } = this.state;
    return(
      <Container className="UserShowPage">
        <h1>{user.full_name}</h1>
        <div className="allBadges SinglePost">
        <h4>Badges</h4>
          {user.badges.map(badge=>(
            <img src={badge.image_url} title={badge.name}>
            </img>
          ))}
        </div>
        {user.posts.map(post=>(
          <Row>
            <section key={post.id} data-id={post.id}>
              <SinglePost post={post} postId={post.id} currentUser={currentUser}>
                <Button active className="mt-2" color="outline-primary" onClick={(e)=>this.handleClickCheckbox(post.id, e)}>Inspiraction - You inspired me to do something!</Button>

              </SinglePost>
            </section>
          </Row>
        ))
        }
        <h3>{user.first_name}'s Inspiractions</h3>
        {user.child_posts.map(post=>{
          return(
            <UserSinglePost post={post}>
            </UserSinglePost>
          )
        })}
      </Container>
    )
  }
}

export default UserShowPage;