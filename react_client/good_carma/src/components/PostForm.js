import React from "react";

import { Post } from "../requests";

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
      <div>
        
        <textarea name="body" id="body" cols="60" rows="4">
        </textarea>

      </div>
      <div>
        <label htmlFor="image_url">Add an Image you Uploaded</label> <br />
        <input name="image_url" id="image_url" />
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