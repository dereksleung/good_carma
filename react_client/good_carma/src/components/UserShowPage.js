import React from "react";

const UserShowPage = props => {

  const {currentUser} = props;

  return(
    <article className="UserShowPage">
      <h1>{currentUser.full_name}</h1>
      <div className="badges">
        {currentUser.badges.map(badge=>(
          <img className="badge" src={badge.image_url} title={badge.name}>
          </img>
        ))}
      </div>
    </article>
  )
}

export default UserShowPage;