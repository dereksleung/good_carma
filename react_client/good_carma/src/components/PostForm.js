import React from "react";

import { Post } from "../requests";
import { FormGroup, Input, Row } from "reactstrap";

const PostForm = props => {

  const handleSubmit = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Post
      .create({
        body: formData.get("body"),
        parent_ids: formData.get("parent_ids")
      })
      .then(res=>{
        props.showNewPost();
        props.clearParentIDs();
      });
    currentTarget.reset();
  };

  return (
    
      <form className="PostForm" onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="textarea" name="body" id="body" placeholder="What's new?" />
          </FormGroup>

        <div>
          <input type="hidden" name="parent_ids" id="parent_ids" value={props.parentIDs} />
        </div>
        <div>
          <input type="submit" value="Post" className="btn btn-primary" />
        </div>
      </form>
    
  );
};

export default PostForm;