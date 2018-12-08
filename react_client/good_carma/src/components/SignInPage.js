import React, { Component } from "react";
import { Session } from "../requests";

const fromFormData = formData => {
  
  const newObj = {};

  for (let [name, value] of formData) {
    newObj[name] = value;
  }

  // Under the hood, formData looks like:
  // const formData = [ ["a", 1], ["b", 2] ]
  // This is a type of destructred assignment.

  // for (let [key, value] of obj1) {
  //   console.log(key, value);
  // }
    // Above is syntax sugar for ð
  // for (let val of formData) {
  //   newObj[val[0]] = val[1]
  // }

  return newObj;
}

// Occasionally when we export something we call a function on it.
export default class SignInPage extends Component {

  // We need `this`, so we'll create a constructor to bind createSession to `this`, so that we can use it as a callback.
  // If we use it as a callback, when we finally call it, it will no longer be owned by the object, because it's a callback.
  constructor(props) {
    super(props);

    this.state = {
      
      // Make it an array because we might get more than one error.
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
          return;
          // return console.error(data.errors);
        }

        // Whenever a session is created, a sign in, the app will respond, and the app will get a user when signed in.
        if (typeof this.props.onSignIn === "function") {
          this.props.onSignIn();
        }
        this.props.history.push("/");
      });
    // console.log(Array.from(formData.entries()));
  }

  render() {

    const { errors } = this.state;
    return (
      <main className="SignInPage">
        <h1>Sign In</h1>
        <form onSubmit={this.createSession}>
          {/* We use a ternary because it's an expression, and JSX handles expressions. A regular if condition is instead a `statement`, which does not return a value, whereas expressions return values.  */}
          {errors.length > 0 ? (
            <p className="FormErrors">{errors.join(", ")}</p>
          ) : null}
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" />
          </div>

          <input type="submit" value="submit" />
        </form>
      </main>
    );
  }
}