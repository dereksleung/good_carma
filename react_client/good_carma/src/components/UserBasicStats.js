import React from "react";
import { Card, CardImg, CardBody, CardLink, CardText } from "reactstrap";

const UserBasicStats = (props) => {

  if (typeof props.full_name !== "undefined" && typeof props.child_post_count !== "undefined") {
  
    return(
      <Card className="UserBasicStats">
        {/* <CardImg top width="100%" style={{backgroundColor: "#03A9F4", minHeight: "100px"}}/> */}
        <CardBody>
          <section className="d-flex justify-content-center">          
            <img src={props.avatar} style={{display: "inline-block"}}/>
            <CardText style={{display: "inline-block"}} className="ml-2">
            {props.full_name}
            </CardText>
          </section>
          <section id="UserInfo" className="d-flex">
            <section className="flex-grow-1">
              <CardLink href="/users/current" >
                <strong style={{fontSize: "0.6em", fontWeight: "600"}}>Inspiractions:</strong> {props.child_post_count}
              </CardLink>
            </section>
            <section className="flex-grow-1 mx-2">
              <CardLink href="/users/current">
              <strong style={{fontSize: "0.6em", fontWeight: "600"}}>Badges:</strong> {props.badges.length}
              </CardLink>
            </section>
            <section className="flex-grow-1">
              <CardLink href="/users/current">
                <strong style={{fontSize: "0.6em", fontWeight: "600"}}>Posts:</strong> {props.posts.length}
              </CardLink>
            </section>
          </section>

        </CardBody>
      </Card>
    )
  }
  
  return(
    <section className="UserBasicStats">

    </section>
  )
}

export default UserBasicStats;