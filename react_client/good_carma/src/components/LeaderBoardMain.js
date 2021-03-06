import React, { Component } from "react";
import { LeaderBoard } from "../requests";
import { Link } from "react-router-dom";
import { Table, Container, } from 'reactstrap';
import UserAvatarSmall from "./UserAvatarSmall";

class LeaderBoardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      new_posters: [],
      two_wk_users: [],
      arr_two_wk: [],
      errors: [],
      loading: true,
      mIATW: []
    };

    this.getMostIActionsInWeek = this.getMostIActionsInWeek.bind(this);
  }

  componentWillMount() {
    LeaderBoard.loadMain().then(data=>{
      console.log(data)
      this.setState({
        new_posters: data["new_posters"],
        two_wk_users: data.arr_two_wk,
        loading: false
      })
    })
  }

  getMostIActionsInWeek() {
    LeaderBoard.mostIActionsInWeek().then(data=>this.props.mIATW = data)
  }

  render() {
    const { new_posters } = this.state;
    const { two_wk_users } = this.state;

    return(
      <Container className="LeaderBoardMain pt-4 d-flex flex-row">
          <section className="flex-grow-2 m-3">
            <h3>New Blood</h3>
            <h5>Drop in with a friendly welcome!</h5>
            <Table className="new-posters">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>First Post Date</th>
                </tr>
              </thead>
              <tbody>
                {new_posters.map(user=>{
                  return(
                    <tr>
                      <th scope="row"></th>
                      <td><Link to={`/users/${user.slug}`}>{user.full_name}</Link></td>
                      <td><UserAvatarSmall avatar_image={user.avatar_image} size="50"/></td>
                      <td>{`${user.first_post_date} ago`}</td>
                    </tr>  
                  )
                })}
              </tbody>
            </Table>
            
            <h3>The Up and Coming</h3>
            <h5>Congratulate these folks for keeping up fighting the good fight!</h5>
            <Table className="two-wk-users">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Latest Post Date</th>
                </tr>
              </thead>
              <tbody>
                {two_wk_users.map(user=>{
                  return(
                    <tr>
                      <th scope="row"></th>
                      <td><Link to={`/users/${user.slug}`}>{user.full_name}</Link></td>
                      <td><UserAvatarSmall avatar_image={user.avatar_image} size="50"/></td>
                      <td>{`${user.latest_post_date} ago`}</td>
                    </tr>  
                  )
                })}
              </tbody>
            </Table>
          </section>      
          <nav className="flex-grow-1 mt-3">
            <h4>Categories</h4>
            <Link to="/leaderboards" title="Your Most Important People. Reach out!">
            Newcomers</Link><br/>
            <Link to={{pathname: "/leaderboards/show", state: { badge_name: "trailblazers" } }} title="Most Inspiractions this Week">
            Trailblazers</Link><br/>
            <Link to={{pathname: "/leaderboards/show", state: { badge_name: "overachievers"}}} title="Most Badges Earned this Week">Overachievers
            </Link><br/>
            <Link to={{pathname: "/leaderboards/show", state: { badge_name: "muses"}}} title="Most Inspires this Week">Muses</Link><br/>
            <Link to={{pathname: "/leaderboards/show", state: { badge_name: "fonts_of_inspiration"}}} title="Fifteen Inspires from One Post">Fonts of Inspiration
            </Link><br/>
          </nav>
      </Container>
    )
  }
  
}

export default LeaderBoardMain;