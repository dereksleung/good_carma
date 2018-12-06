import React, { Component } from "react";

import { Inspire } from "../requests";

class PostInspireButtonForm extends Component {
  constructor(props) {
    super(props);
    console.log('receiving level', props.level)
    this.state = {

    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Inspire.createPostInsp({
      inspiring_entry_type: formData.get("inspiring_entry_type"),
      postId: this.props.postId,
      color: formData.get("color")
    });

    currentTarget.reset();
  };
  render() {
    return (
      <form className="PostInspireButtonForm" onSubmit={this.handleSubmit}>
        <div>
          <input type="hidden" name="inspiring_entry_type" id="inspiring_entry_type" value="Post" />
        </div>
        <div>
          <input type="hidden" name="color" id="color" value={this.props.level} />
        </div>

        <div>
          <input type="submit" value="Inspire" className="btn btn-outline-primary"/>
        </div>
      </form>
    );
  }
}



export default PostInspireButtonForm;