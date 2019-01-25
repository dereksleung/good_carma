import React from "react";

import CommentDetails from "./CommentDetails";
import CommentForm from "./CommentForm";

const CommentList = (props) => {
  return(
    <section className="CommentList">
      <CommentForm postId={props.postId} submitComment={props.submitComment}/>
      {props.comments.map(c=>{
        return(
        <CommentDetails {...c} key={c.slug} />
        )
      })}
    </section>
  )
}


export default CommentList;