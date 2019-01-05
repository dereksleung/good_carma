import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const PopoverPost = (props) => (
  <Tippy content={`${props.body}`} arrow={true} duration={500} delay={[100, 50]}>
    {props.children}
  </Tippy>
)

export default PopoverPost;