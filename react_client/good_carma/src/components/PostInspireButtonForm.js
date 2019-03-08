import React, { Component } from "react";

class PostInspireButtonForm extends Component {
  constructor(props) {
    super(props);
    console.log('receiving level', props.level);
    this.state = {
    };
  }
  
  render() {
    return (
      <form className="PostInspireButtonForm mr-2" onSubmit={this.props.handleSubmit}>
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