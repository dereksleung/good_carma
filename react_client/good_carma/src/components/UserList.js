import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import { Follow, User } from "../requests";
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody } from "reactstrap";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startUser: {},
      users: []
    }
  }

  componentDidMount() {

    const id = this.props.match.params.id;

    this.props.loadUsers(id)
      .then(res=>{
        this.setState({
            users: res
        })
      });
    
    User.show(id)
      .then(res=>{
        this.setState((prevState, props) => {
          return {
            ...prevState,
            startUser: res
          }
        });
      });

  }

  render() {
    const { startUser, users } = this.state;
    const id = this.props.match.params.id;

    return(
      <section className="UserList">
        <Container className="mt-5">
          <Row>
            <Col className="col-sm-4 col-md-3">
              <section className="p-3 mb-2 bg-white">
                <h5>{startUser.full_name}</h5>
                <p>{this.props.listType}</p>
              </section>
            </Col>
            {users.map(user=>{
              return(
                <Col className="User col-sm-4 col-md-3">
                  <Link to={`/users/${user.id}`}>
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

export default UserList;