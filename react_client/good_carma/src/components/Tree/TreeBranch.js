import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";
import BranchHrzntl from "./branchHrzntl.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, calcStyle } = props;
  const {cummltvAngle, ...trueCalcStyle} = calcStyle;

  let qtyBranches;
  if (typeof child_posts !== "undefined") {
    qtyBranches = child_posts.length;
  } else {
    qtyBranches = 0;
  }
  let branchPositions = [];

  let oneBranchStyle = calcStyle;
  const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
  oneBranchStyle.transform = `rotate(${["","-"][Math.round(Math.random())]}24deg) ${currScale}`;

  function setBranchPositions(ind) {

    const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
    const currRelatvAngle = parseInt(oneBranchStyle.transform.match(/-*\d{1,3}/)[0]);

    // currRelatvAngle senses which way the previous branch turned, and alternates it to the other side by changing the rotation angle.
    
    if (ind == 0) {
      oneBranchStyle.left = "0vh";
    }
    const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 1);
    const currPlace = parseInt(oneBranchStyle.left.match(/\d+/)[0]);
    
    oneBranchStyle.left = `${currPlace + spacingUnit}vh`;
    
    if (currRelatvAngle > 0) {
      oneBranchStyle.transform = `rotate(${currRelatvAngle - 36}deg) ${currScale}`
      oneBranchStyle.cummltvAngle -= 36;
    } else {
      oneBranchStyle.transform = `rotate(${currRelatvAngle + 36}deg) ${currScale}`;
      oneBranchStyle.cummltvAngle += 36;
    }

    const styleLocalClone = Object.assign({}, oneBranchStyle);
    branchPositions.push(styleLocalClone);
    return styleLocalClone;
  }
  
  return(
    <section className="TreeBranch" style={trueCalcStyle}>
      <PopoverPost {...restProps}>
        <img src={BranchHrzntl}>
        </img>
      </PopoverPost>
      {(typeof child_posts !== "undefined") ? 
        child_posts.map((post,ind)=>{
          return(
            <TreeBranch post={post} calcStyle={setBranchPositions(ind)}>
            </TreeBranch>
          )
        })
      : ""
      }
    </section>
  )
}

export default TreeBranch;
