import React from "react";

const UserAvatarSmall = (props) => {
  return(
    <div className="UserAvatarSmall mr-2" style={{
      backgroundImage: `url(${props.avatar_image})`,
      backgroundColor: "#03A9F4",
      display: "inline-block",
      height: `${props.size}px`,
      minWidth: `${props.size}px`,
      borderRadius: "100%",
      backgroundSize: "contain"
    }}>

    </div>
  )
}

export default UserAvatarSmall;