import React, { Component } from "react";
import { LeaderBoard } from "../requests";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";

class OtherLeaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records_array: [],
      badge_image_url: "",
      titles_array: []
    }

  }

  componentDidMount() {
    LeaderBoard.loadWeeklyOther(this.props.location.state.badge_name)
      .then(res=>{
        this.setState({
          titles_array: res.titles_array,
          records_array: res.records_array,
          badge_image_url: res.image
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state.badge_name !== prevProps.location.state.badge_name) {
      LeaderBoard.loadWeeklyOther(this.props.location.state.badge_name)
      .then(res=>{
        this.setState({
          titles_array: res.titles_array,
          records_array: res.records_array,
          badge_image_url: res.image
        });
      });
    }
  }

  render() {
    const { titles_array, records_array, badge_image_url } = this.state;

    // Deep copying the badge_name because the .replace function doesn't seem to work otherwise.
    const badge_name = (' ' + this.props.location.state.badge_name).slice(1);
    badge_name.replace(badge_name.charAt(0), badge_name.charAt(0).toUpperCase());
    
    let rows = [];

    for (let user of records_array) {
      let row = 
        <tr key={user.slug}> 
          {/* <th scope="row"></th> */}
          <td>
            <img src={`${user.avatar_image}`} style={{width: "50px", height: "50px", borderRadius: "100%"}}></img>
            <Link to={`users/${user.slug}`}>{user.full_name}</Link>
          </td>
          {titles_array.map(title=>{
            if (title != "full_name") {
              return(
                <td>
                  {user[title]}
                </td>
              )
            }
          })}
        </tr>
      rows.push(row);
    }
    
    

    return(
        <Container className="OtherLeaderboard mt-4 d-flex flex-row">
          <section className="flex-grow-2 m-3">
            <h3>{badge_name}}</h3>
            
            <Table className={this.props.location.state.badge_name}>
              <thead>
                <tr>
                  {titles_array.map(title=>(
                    <th>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row=>{
                  return(row)
                })}
              </tbody>
            </Table>
          </section>
          <section className="d-flex flex-grow-1 justify-content-end"></section>      
          <nav className="mt-3">
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
            {/* <Link to="">Thought Provokers - Longest Posts earning 10 Inspires 
            </Link><br/>
            <Link to={{pathname: "/leaderboards/show", state: { badge_name: "overachievers"}}} title="Most Badges Earned this Week">Wild Growths - Users whose Posts this Week Tripled 
            </Link> */}
          </nav>
      </Container>
    )
  }
}

export default OtherLeaderboard;