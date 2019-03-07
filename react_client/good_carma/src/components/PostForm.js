import React, { Component } from "react";

import { Post } from "../requests";
import { Button, Form, FormGroup, Input, Label, CustomInput, Collapse } from "reactstrap";

class PostForm extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      toggleUploadImage: false,
      body: "",
      image: {}
    };

    this.fileInput = React.createRef();
    this.fromFormData = this.fromFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  fromFormData(formData) {
    let newObj = {};
    for (let [name, val] of formData.entries()) {
      newObj[name] = val;
    }

    return newObj;
  }

  toggle() {
    this.setState({toggleUploadImage: !this.state.toggleUploadImage})
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

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    debugger;
    Post
      .create(this.fromFormData(formData))
      .then(res=>{
        this.props.showNewPost();
        this.props.clearParentIDs();
      });
    currentTarget.reset();
  };

  handleFileSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    Post.postImageFile(formData)
      .then(data=>{
        this.props.showNewPost();
        this.props.clearParentIDs();
      });
    currentTarget.reset();
  }

  render() {
    return (
      <section className="PostForm d-flex flex-column justify-content-start" style={{position: "relative", backgroundColor:"#FFFFFF"}}>
        <Form className="bodyForm d-flex flex-row flex-wrap" onSubmit={this.handleSubmit}>
          <div className="flex-grow-1">
            <Input name="body" id="body" placeholder="What's new?" onChange={this.handleChange} value={this.state.body} style={{borderRadius: "0"}}/>
          </div>
          
          <div>
            <input type="hidden" name="parent_ids" id="parent_ids" value={this.props.parentIDs} />
          </div>
          <div>
            <Input type="submit" value="Post" className="btn btn-primary" style={{borderRadius: "0"}}/>
          </div>
          <div className="w-100"></div>
        </Form>
        <section className="buttons-for-fields flex-grow-1">
          <Button color="outline-primary" onClick={this.toggle} style={{borderRadius: "0"}}>Attach Image</Button>
          <Collapse isOpen={this.state.toggleUploadImage}>
            <Form className="image-file mt-2" onSubmit={this.handleFileSubmit}>
              <FormGroup>
                <Label for="postImageBrowse">Image File</Label>
                <CustomInput id="postImageBrowse" type="file" name="post[image]" ref={this.fileInput}></CustomInput>
              </FormGroup>
              <Input type="submit" value="Submit Image File First" className="btn btn-secondary"/>
            </Form>
          </Collapse>
        </section>
      </section>
    );
  }
};


export default PostForm;