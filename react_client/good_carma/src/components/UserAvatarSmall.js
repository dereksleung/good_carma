import React from "react";

const UserAvatarSmall = (props) => {
  return(
    <div style={{
      backgroundImage: `url(${props.avatar_image})`,
      backgroundColor: "#03A9F4",
      display: "inline-block",
      height: `${props.size}px`,
      width: `${props.size}px`,
      borderRadius: "100%",
      backgroundSize: "contain"
    }}>

    </div>
    // <img src={props.avatar_image} style={{
    //   display: "inline",
    //   height: `${props.size}px`,
    //   width: `${props.size}px`,
    //   borderRadius: "100%",
    // }}/>
  )
}

export default UserAvatarSmall;