import React, { Component } from "react";
import { Session } from "../requests";
import { Form, FormGroup, Label, Input } from "reactstrap";

const fromFormData = formData => {
  
  const newObj = {};

  for (let [name, value] of formData) {
    newObj[name] = value;
  }

  return newObj;
}

export default class SignInPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.createSession = this.createSession.bind(this);
  }

  createSession(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    
    Session.create(fromFormData(formData))
      .then(data=>{ 
        if (data.status === "error") {
          this.setState({
            errors: [data.message]
          });
        }

        if (typeof this.props.onSignIn === "function") {
          this.props.onSignIn();
        }
        this.props.history.push("/");
      });

  }

  render() {

    const { errors } = this.state;
    return (
      <main className="SignInPage d-flex justify-content-center">
        <section className="d-flex flex-column p-3 mt-5 SinglePost">
          <h1>Sign In</h1>
          <Form onSubmit={this.createSession}>
            {errors.length > 0 ? (
              <p className="FormErrors">{errors.join(", ")}</p>
            ) : null}
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <br />
              <Input type="email" name="email" id="email" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <br />
              <Input type="password" name="password" id="password" />
            </FormGroup>

            <Input className="btn btn-secondary mt-3" type="submit" value="Submit" />
          </Form>
        </section>
      </main>
    );
  }
}