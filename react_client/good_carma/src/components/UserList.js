import React, { Component } from "react";
import { Follow, User } from "../requests";
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody } from "reactstrap";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thisUser: {},
      users: []
    }
  }

  componentDidMount() {

    const id = this.props.match.params.id;

    this.props.loadUsers(id)
      .then(res=>{
        this.setState((prevState, props) =>({
          ...prevState,
          users: res
        })
      )});
    
    User.show(id)
      .then(res=>{
        this.setState((prevState, props) => {
          return {
            ...prevState,
            this_user: res
          }
        });
      });

  }

  render() {
    const { this_user, users } = this.state;
    const id = this.props.match.params.id;

    return(
      <section className="UserList">
        <Container className="mt-5">
          <Row>
            <Col className="col-sm-4 col-md-3">
              <section className="p-3 mb-2 bg-white">
                <h5>{`${this_user.first_name} ${this_user.last_name}`}</h5>
                <p>{this.props.listType}</p>
              </section>
            </Col>
            {users.map(user=>{
              return(
                <Col className="User col-sm-4 col-md-3">
                  <Card>
                    <CardImg top src={user.splash_image} 
                      style={{
                        objectFit: "cover", 
                        backgroundColor: "#03A9F4",
                        minHeight: "20vh",
                      }}
                    />
                    <CardBody>
                      <CardTitle>
                        {user.full_name}
                      </CardTitle>
                    </CardBody>
                  </Card>
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