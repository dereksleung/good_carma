import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const InspirePopover = (props) => {

  const { calcStyle } = props; 


  return(
    <section className="InspirePopover" style={{
      position: "absolute",
      display: "inline-block",
      left: "12%",
      transformOrigin: "center left",
      height: "30px",
      width: "30px"
    }}>
      <Tippy content={<><img src={`${props.avatar}`}></img> <p>{props.full_name}</p></>} arrow={true} duration={500} delay={[100, 50]} size="large">
        {props.children}
      </Tippy>
    </section>
  )
}

export default InspirePopover;