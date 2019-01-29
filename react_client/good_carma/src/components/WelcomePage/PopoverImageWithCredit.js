import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const PopoverImageWithCredit = (props) => {

  return(
    <Tippy content={
      <a href={`${props.credUrl}`}>{props.credName}</a> 
    }
    interactive={true} >
      {props.children}
    </Tippy>
  )
}

export default PopoverImageWithCredit;