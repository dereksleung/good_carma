import React from "react";

import { Inspire } from "../requests";

const PostLikeButtonForm = (props) => {
  const handleSubmit = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Inspire.createPostInsp({
      inspiring_entry_type: formData.get("inspiring_entry_type"),
      postId: props.postId
    });

    currentTarget.reset();
  };

  return (

    <form className="PostLikeButtonForm" onSubmit={handleSubmit}>
      <div>
        <input type="hidden" name="inspiring_entry_type" id="inspiring_entry_type" value="Post" />
      </div>
      <div>
        <input type="submit" value="Like" />
      </div>
    </form>
  );

}



export default PostLikeButtonForm;