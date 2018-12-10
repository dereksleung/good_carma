import React from "react";
import UserSinglePost from "./UserSinglePost";

const CurrentUser = props => {


  const {currentUser} = props;

  return(
    <article className="UserShowPage">
      <h1>{currentUser.full_name}</h1>
      <div className="badges SinglePost">
        <h4>Badges</h4>
        {currentUser.badges.map(badge=>(
          <img className="b-earn mr-2 mb-1" src={badge.image_url} title={badge.name}>
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