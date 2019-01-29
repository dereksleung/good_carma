import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import UserAvatarSmall from "../UserAvatarSmall";
import { Link } from "react-router-dom";

const PopoverPost = (props) => (
  <Tippy content={
    <>
      <UserAvatarSmall avatar_image={props.avatar_image} size="50" />
      <Link to={`/users/${props.slug}`}>{props.full_name}</Link>
      <p>{props.body}</p>
    </>
    } 
    arrow={true} duration={500} delay={[100, 50]}>
    {props.children}
  </Tippy>
)

export default PopoverPost;