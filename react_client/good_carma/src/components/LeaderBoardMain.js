import React, { Component } from "react";
import { LeaderBoard } from "../requests";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Table, Container, Col, Row } from 'reactstrap';




class LeaderBoardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      new_posters: [],
      two_wk_users: [],
      arr_two_wk: [],
      errors: [],
      loading: true
    }

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
    LeaderBoard.mostIActionsInWeek().then(data=>this.setState({
      mIATW: data
    }))
  }
  // Define request handler functions here, then pass the function into the other stateless leaderboard Route/Link components.

  render() {
    const { new_posters } = this.state;
    const { two_wk_users } = this.state;

    return(
      <Container className="LeaderBoardMain">
          <nav>
            <Link to={{pathname: "/leaderboards/most_i_actions_this_week", state: { loadData: this.getMostIActionsInWeek } }}>
            Most Inspiractions this Week</Link>
          </nav>
          <h3>New Posters</h3>
          <h5>Drop in and say "Hi!"</h5>
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
                    <td>{`${user.first_name}`}</td>
                    <td><img src={`${user.avatar}`}></img></td>
                    <td>{`${user.first_post_date} ago`}</td>
                  </tr>  
                )
              })}
            </tbody>
          </Table>
          
          <h3>Continuing New Posters</h3>
          <h5>Congratulate these folks!</h5>
          <Table className="two-wk-users">
            <h4></h4>
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
                    <td>{`${user.first_name}`}</td>
                    <td><img src={`${user.avatar}`}></img></td>
                    <td>{`${user.latest_post_date} ago`}</td>
                  </tr>  
                )
              })}
            </tbody>
          </Table>
                
      </Container>
    )
  }

}

export default LeaderBoardMain;