import React, { Component } from "react";
import { Form, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { Search } from "../requests";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fromFormData = this.fromFormData.bind(this);
  }
 
  handleSubmit(event) {
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    Search.user(this.fromFormData(formData))
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

  render() {
    
    return(
      <Form action="/search" method="GET" id="nav-searchbar" className="SearchBar">
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

export default SearchBar;