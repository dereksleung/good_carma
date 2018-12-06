import React from "react";

import { Post } from "../requests";
import { FormGroup, Input, Row } from "reactstrap";

const PostForm = props => {

  const handleSubmit = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Post.create({
      body: formData.get("body"),
      parent_ids: formData.get("parent_ids")
    });

    currentTarget.reset();
  };

  return (
    
      <form className="PostForm" onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="textarea" name="body" id="body" placeholder="What's new?" />
          </FormGroup>
        <div>
          <label htmlFor="picture_url">Add an picture you Uploaded</label> <br />
          <input name="picture_url" id="picture_url" />
        </div>
        <div>
          <input type="hidden" name="parent_ids" id="parent_ids" value={props.parentIDs} />
        </div>
        <div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    
  );
};

export default PostForm;