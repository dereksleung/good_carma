import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import { Search } from "../requests";
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody } from "reactstrap";

class UserResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const query = this.props.location.state.query;
    Search.users(query)
      .then(res=>{
        this.setState({
            users: res
        });
      });

  }

  componentDidUpdate(prevProps) {
    const query = this.props.location.state.query;
    if (query !== prevProps.location.state.query) {
      Search.users(query)
        .then(res=>{
          this.setState({
              users: res
          });
        });
    }
  }

  render() {
    const { users } = this.state;

    return(
      <section className="UserResults pt-5">
        <Container className="">
          <Row>
            {users.map(user=>{
              return(
                <Col className="User col-sm-4 col-md-3">
                  <Link to={`/users/${user.slug}`}>
                    <Card>
                      <CardImg top src={user.splash_image} 
                        style={{
                          objectFit: "cover", 
                          backgroundColor: "#03A9F4",
                          minHeight: "20vh",
                        }}
                      />
                      <CardBody style={{position: "relative"}}>
                        <section style={{
                          position: "absolute",
                          display: "inline-block",
                          top: "-60%",
                          left: "10%",
                          minWidth: "10vh",
                          height: "10vh",
                          backgroundColor: "#03A9F4",
                          backgroundImage: `url(${user.avatar_image})`,
                          backgroundSize: "contain",
                          borderRadius: "100%",
                          borderStyle: "solid",
                          borderColor: "white"
                        }} />
                        <CardTitle>
                          {user.full_name}
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>
    )
  }
}

export default UserResults;