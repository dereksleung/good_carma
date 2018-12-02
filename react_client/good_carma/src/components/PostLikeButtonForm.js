import React from "react";

import { Inspire } from "../requests";

const PostLikeButtonForm = (props) => {
  const handleSubmit = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    Inspire.create({
      inspiring_entry_id: formData.get("inspiring_entry_id"),
      inspiring_entry_type: formData.get("inspiring_entry_type")
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
        <input type="submit" value="Submit" />
      </div>
    </form>
  );

}



export default PostLikeButtonForm;