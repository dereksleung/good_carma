import React from "react";

import { Comment } from "../requests";
import { FormGroup, Input, Row } from "reactstrap";

const CommentForm = props => {

  return (
    <form className="CommentForm mb-3 d-flex flex-row" onSubmit={(event)=>props.submitComment(event,props.postId)}>
        <FormGroup className="flex-grow-1">
          <Input name="body" id="body" placeholder="What do you think?" bsSize="sm"/>
        </FormGroup>

      <div>
        <input type="submit" value="Comment" className="btn btn-primary btn-sm" />
      </div>
    </form>
  );
};

export default CommentForm;