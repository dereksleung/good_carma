import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";
import BranchHrzntl from "./branchHrzntl.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, ...funcProps } = props; 
  const qtyBranches = child_posts.length;
  let branchPositions = [];
  let currStyle = {
    position: "absolute",
    left: `${"50%"}`,
    bottom: `${"-30%"}`,
    transform: `rotate(${"-16"}deg)`,
    minWidth: "500px",
    overflow: "visible",
    
  }

  const setBranchPositions = (ind, whichSideOfTrunk) => {
    const currAngle = parseInt(currStyle.transform.match(/-*\d{1,3}/));
    ind % 2 == 0 ? 
      (
        currStyle.transform = `rotate(${currAngle + 20}deg)`
      ) : (
        currStyle.transform = `rotate(${currAngle - 20}deg)`
      )
    
    if (whichSideOfTrunk == "left") {
      if (currStyle.left) {
        delete currStyle.left;
      }

      if (ind == 0) {
        currStyle.right = "0%"
      }
      const spacingUnit = parseInt(currStyle.minWidth.match(/\d+/)) / (qtyBranches + 2);
      const currPlace = parseInt(currStyle.right.match(/\d+/));

      currStyle.right = `${currPlace + spacingUnit}%`
    }

    if (whichSideOfTrunk == "right") {
      if (currStyle.right) {
        delete currStyle.right;
      }

      if (ind == 0) {
        currStyle.left = "0%"
      }
      const spacingUnit = parseInt(currStyle.minWidth.match(/\d+/)) / (qtyBranches + 2);
      const currPlace = parseInt(currStyle.left.match(/\d+/));

      currStyle.left = `${currPlace + spacingUnit}%`
    }

    branchPositions.push(currStyle);
  }
  
  return(
    <section className="TreeBranch">
      <PopoverPost {...restProps}>
        <img src={BranchHrzntl} style={{
                position: "absolute",
                left: `${"50%"}`,
                bottom: `${"-30%"}`,
                transform: `rotate(${"-16"}deg) scale(0.5,0.5)`,
                minWidth: "500px",
                overflow: "visible"
                }}>
        </img>
      </PopoverPost>
    </section>
  )
}

export default TreeBranch;
