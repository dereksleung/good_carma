import React, { Component } from "react";
import { UncontrolledAlert, Container, Nav, NavItem, NavLink, Form, FormGroup, Label, Input } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import { Post } from "../requests";


class EditPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successful: "",
      body: props.body,
      picture_url: props.picture_url,
      image: props.image,
      parent_ids: props.parent_ids
    };

    this.fileInput = React.createRef();
    this.fromFormData = this.fromFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  componentDidMount() {
    
    // for (let key in this.state) {
    //   debugger;
    //   this.props.key ? this.setState({
    //     key: this.props.key
    //   }) : null  
    // }
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

    Post.update(this.fromFormData(formData), this.props.id)
      .then(data=>
      this.props.updateAfterEdit(data)
      );
  }

  handleFileSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    Post.updateImageFile(formData, this.props.id)
      .then(data=>
        this.props.updateAfterEdit(data)
      );
  }

  render() {

    const { body, image, picture_url } = this.state;

    return(
      
      <Container className="EditPostForm mt-4 pb-4 d-flex flex-column" style={{backgroundColor:"white", opacity:"0.9"}}>
        {this.state.successful ? 
          <UncontrolledAlert color="info">{this.state.successful.message}</UncontrolledAlert> 
          : ""
        }

        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input name="body" type="textarea" onChange={this.handleChange} value={this.state.body} />
          </FormGroup>
          <FormGroup>
            <Label>An Image URL</Label>
            <Input name="picture_url" type="text" onChange={this.handleChange} value={this.state.picture_url} />
          </FormGroup>
          <Input type="submit" value="Update Above Fields" className="btn btn-secondary text-white"/>
        </Form>

        <Form className="image-file mt-2" onSubmit={this.handleFileSubmit}>
          <FormGroup>
            <Label className="custom-file-label">Image File</Label>
            <Input type="file" name={`image`} className="custom-file-input" ref={this.fileInput}></Input>
          </FormGroup>
          
          <Input type="submit" value="Submit Image File" className="btn btn-secondary"/>
        </Form>

      </Container>
    )
  }

}

export default EditPostForm;