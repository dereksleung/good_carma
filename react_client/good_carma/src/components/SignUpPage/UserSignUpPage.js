import React, { Component } from "react";
import { Container, Nav, NavItem, NavLink, Form, FormGroup, Label, Input } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import { User } from "../../requests";

class UserSignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successful: "", 
      first_name: "",
      last_name: "",
      email: "",
      company_email: "",
      password: "",
      password_confirmation: ""
    };


    this.fromFormData = this.fromFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  fromFormData(formData) {
    const obj = {};

    for (let [name, val] of formData.entries()) {
      obj[name] = val;
    }

    return obj;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    User.create(this.fromFormData(formData))
      .then(res=>
        this.setState({
          successful: res
        })
      )
  }


  render() {

    return(
      <Container className="SignUpPage mt-4 pb-4 d-flex flex-column" style={{backgroundColor:"white", opacity:"0.9"}}>
        <Nav className="my-4 d-flex justify-content-center">
          <NavItem>
            <NavLink className="" exact to="/sign_up/company" tag={RRNavLink}>Company Admin</NavLink>
          </NavItem>

          <NavItem>
            <NavLink exact to="/sign_up/user" tag={RRNavLink}>User</NavLink>
          </NavItem>
        </Nav>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input name="first_name" onChange={this.handleChange} value={this.state.first_name} />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input name="last_name" onChange={this.handleChange} value={this.state.last_name} />
          </FormGroup>

          <FormGroup>
            <Label>Company Admin Email</Label>
            <Input name="company_email" onChange={this.handleChange} value={this.state.company_email} />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input name="email" onChange={this.handleChange} value={this.state.email} />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input name="password" onChange={this.handleChange} value={this.state.password} />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation}/>
          </FormGroup>

          <Input type="submit" className="btn btn-secondary text-white"/>
        </Form>
      </Container>
    )
  }
}

export default UserSignUpPage;