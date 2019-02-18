import React, { Component } from "react";
import { UncontrolledAlert, Container, Nav, NavItem, NavLink, Form, FormGroup, Label, Input } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import { Company } from "../../requests";

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successful: "", 
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }


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

      Company.create(this.fromFormData(formData))
      .then(data=>
        this.setState({
          successful: data
        })
      )

  }



  render() {

    return(
      
      <Container className="SignUpPage mt-4 pb-4 d-flex flex-column" style={{backgroundColor:"white", opacity:"0.9"}}>
        {this.state.successful ? 
          <UncontrolledAlert color="info">{this.state.successful.message}</UncontrolledAlert> 
          : ""
        }
        <Nav className="my-4 d-flex justify-content-center">
          <NavItem>
            <NavLink className="" exact to="/sign_up/company" tag={RRNavLink}>Company Admin</NavLink>
          </NavItem>

          <NavItem>
            <NavLink exact to="/sign_up/user" tag={RRNavLink}>User</NavLink>
          </NavItem>
        </Nav>

        <Form action="http://localhost:3000/api/v1/companies" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Company Name</Label>
            <Input name="name" onChange={this.handleChange} value={this.state.name} />
          </FormGroup>

          <FormGroup>
            <Label>Admin Email</Label>
            <Input name="email" onChange={this.handleChange} value={this.state.email} />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input name="password" onChange={this.handleChange} value={this.state.password} type="password" />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation} type="password" />
          </FormGroup>

          <Input type="submit" className="btn btn-secondary text-white"/>
        </Form>
      </Container>
    )
  }

}

export default SignUpPage;