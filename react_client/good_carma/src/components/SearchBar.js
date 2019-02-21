import React, { Component } from "react";
import { Form, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { Search } from "../requests";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom"; 

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: "/search",
      state: { query: `${this.state.query}`}
    })
  }

  render() {

    return(
      <Form action="/api/v1/search" method="GET" id="nav-searchbar" onSubmit={this.handleSubmit} className="SearchBar">
        <InputGroup>
          <Input type="text" name="query" value={this.state.query} onChange={this.handleChange} style={{fontFamily: "Roboto, sans-serif", fontWeight: "300"}}></Input>
          <InputGroupAddon addonType="append">
            <Input type="submit" className="btn btn-outline-primary" value="Search" style={{fontFamily: "Roboto, sans-serif", fontWeight: "300"}}></Input>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    )
  }
}

export default withRouter(SearchBar);