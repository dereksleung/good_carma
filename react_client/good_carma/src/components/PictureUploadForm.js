import React, { Component } from "react";
import { User } from "../requests";
import { Form, Input, Label } from "reactstrap";

class PictureUploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successful: {}
    }

    this.fileInput = React.createRef();
    this.fromFormData = this.fromFormData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const viewFormData = Array.from(formData);
    console.log(viewFormData);

    User.uploadImage(formData, this.props.id)
      .then(res=>
        this.setState({
          successful: res
        })
      )
  }

  render() {
    return(
      <Form className="PictureUploadForm" onSubmit={this.handleSubmit}>
        <Label className="custom-file-label">Avatar</Label>
        <Input type="file" name={`${this.props.image_type}_image`} className="custom-file-input" ref={this.fileInput}></Input>

        <Input type="submit" className="btn btn-secondary"/>
      </Form>
    )
  }
}

export default PictureUploadForm;