import React from "react";

const UserConfirmPage = props => {

  const full_name = props.match.id;
    
    return(
      <section className="UserConfirmPage mt-5">
        <p>
          {this.props.full_name} is confirmed!
        </p>
      </section>
    )
  }


export default UserConfirmPage;