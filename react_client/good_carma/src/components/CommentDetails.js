import React from "react";
import {Link} from "react-router-dom";

const CommentDetails = (props) => (
  <section className="CommentDetails">
    <Link className="mr-2" to={`/users/${props.c_user_slug}`}>{props.c_user}</Link>
    <span>{props.created_at}</span> 
    <p>{props.body}</p>
  </section>  
);

export default CommentDetails;