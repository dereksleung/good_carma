import React from "react";
import UserSinglePost from "./UserSinglePost";

const CurrentUser = props => {


  const {currentUser} = props;

  return(
    <article className="UserShowPage">
      <h1>{currentUser.full_name}</h1>
      <div className="badges">
        {currentUser.badges.map(badge=>(
          <img src={badge.image_url} title={badge.name}>
          </img>
        ))}
      </div>
      {currentUser.posts.map(post=>{
        return(
        <UserSinglePost post={post}>
        </UserSinglePost>
        )
      })}
      <h3>{currentUser.first_name}'s Inspiractions</h3>
      {currentUser.child_posts.map(post=>{
        return(
          <UserSinglePost post={post}>
          </UserSinglePost>
        )
      })}
    </article>
  )
}

export default CurrentUser;