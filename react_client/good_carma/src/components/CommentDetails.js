import React from "react";
import {Link} from "react-router-dom";
import UserAvatarSmall from "./UserAvatarSmall";

const CommentDetails = (props) => (
  <section className="CommentDetails">
    <section className="d-flex align-items-center">
      <Link className="mr-2 d-flex align-items-center" to={`/users/${props.c_user_slug}`}>
        <UserAvatarSmall avatar_image={props.c_user_avatar_image} size={35}/>
        <span>{props.c_user}</span>
      </Link>
      <span style={{fontSize: "0.8rem", color: "gray"}}>{props.created_at}</span>   
    </section>
    <p>{props.body}</p>
  </section>  
);

export default CommentDetails;