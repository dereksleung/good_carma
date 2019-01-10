import React, { Component } from "react";
import { Container, TabContent, TabPane, Form, FormGroup, Label, Input } from "reactstrap";


class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    return(
      <Container className="SignUpPage mt-4" style={{backgroundColor:"white", opacity:"0.9"}}>
        <Form onSubmit={this.handleSubmit} >
          <FormGroup>
            <Label>Company Name</Label>
            <Input name="name" onChange={this.handleChange} value={this.state.name} name="name" />
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

          <Input type="submit" />
        </Form>

      </Container>
    )
  }

}

export default SignUpPage;