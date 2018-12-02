import React from "react";

import CommentDetails from "./CommentDetails";

const CommentList = (props) => {
  return(
    <section className="CommentList">
      {props.comments.map(c=>{
        return(
        <CommentDetails {...c} />
        )
      })}
    </section>
  )
}


export default CommentList;