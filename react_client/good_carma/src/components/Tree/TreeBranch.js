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
  // const initAngle = parseInt(trueCalcStyle.transform.match(/-*\d{1,3}/)[0]);

  let oneBranchStyle = calcStyle;
  const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
  oneBranchStyle.transform = `rotate(${["","-"][Math.round(Math.random())]}24deg) ${currScale}`;

  function setBranchSize() {
    // let currMinWidth = parseInt(oneBranchStyle.minWidth.match(/\d+/g)[0]);
    // oneBranchStyle.minWidth = `${currMinWidth * 0.66}px`;
    
    let currRotate = oneBranchStyle.transform.match(/(rotate)\(.*(deg)\)\s/)[0];
    let currScaleX = currScale.match(/\d+\.?\d*(?=,)/)[0];
    let currScaleY = currScale.match(/\d+\.?\d*/g)[1]; 

    oneBranchStyle.transform = `${currRotate} scale(${currScaleX * 0.6},${currScaleY * 0.6})`
  }

  setBranchSize();

  function setBranchPositions(ind) {

    const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
  
    let currRelatvAngle = parseInt(oneBranchStyle.transform.match(/-*\d{1,3}/)[0]);

    // currRelatvAngle senses which way the previous branch turned, and alternates it to the other side by changing the rotation angle.
    // In non-trunk branches, it should sense the parent branch's angle to determine whether to use the CSS `left` or `right` positioning property. 

    
    if (cummltvAngle < -90) {
      if ("right" in oneBranchStyle) {
        delete oneBranchStyle.right;
      }

      if (ind == 0) {
        oneBranchStyle.left = "0vh";
      }
      const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 1);
      const currPlace = parseInt(oneBranchStyle.left.match(/\d+/)[0]);
      
      oneBranchStyle.left = `${currPlace + spacingUnit}vh`;
      // if ("left" in oneBranchStyle) {
      //   delete oneBranchStyle.left;
      // }

      // if (ind == 0) {
      //   oneBranchStyle.right = "0px"
      // }
      // const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 1);
      // const currPlace = parseInt(oneBranchStyle.right.match(/\d+/)[0]);

      // oneBranchStyle.right = `${currPlace + spacingUnit}px`
      
    }
    
    
    if (cummltvAngle >= -90) {
      if ("right" in oneBranchStyle) {
        delete oneBranchStyle.right;
      }

      if (ind == 0) {
        oneBranchStyle.left = "0vh";
      }
      const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 1);
      const currPlace = parseInt(oneBranchStyle.left.match(/\d+/)[0]);
      
      oneBranchStyle.left = `${currPlace + spacingUnit}vh`;
    }
    
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
