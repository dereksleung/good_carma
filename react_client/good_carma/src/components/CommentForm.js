import React from "react";

import { Comment } from "../requests";
import { FormGroup, Input, Row } from "reactstrap";

const CommentForm = props => {

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   const { currentTarget } = event;
  //   const formData = new FormData(currentTarget);
  //   Comment
  //     .create({
  //       body: formData.get("body")
  //     }, props.postId)
  //     .then(res=>{
  //       props.showNewPost();
  //       props.clearParentIDs();
  //     });
  //   currentTarget.reset();
  // };

  return (
    
      <form className="CommentForm mb-3 d-flex flex-row" onSubmit={(event)=>props.submitComment(event,props.postId)}>
          <FormGroup className="flex-grow-1">
            <Input name="body" id="body" placeholder="What do you think?" />
          </FormGroup>

        <div>
          <input type="submit" value="Post" className="btn btn-primary" />
        </div>
      </form>
    
  );
};

export default CommentForm;