import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";
import BranchHrzntl from "./branchHrzntl.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, ...funcProps } = props; 

  debugger;
  let qtyBranches;
  if (typeof child_posts !== "undefined") {
    qtyBranches = child_posts.length;
  } else {
    qtyBranches = 0;
  }
  let branchPositions = [];
  const initAngle = parseInt(props.style.transform.match(/-*\d{1,3}/)[0]);

  let oneBranchStyle = props.style;
  oneBranchStyle.transform = `rotate(${["","-"][Math.round(Math.random())]}24deg) scale(1,1)`;


  
  
  // {
  //   position: "absolute",
  //   left: `${"50%"}`,
  //   bottom: `${"50%"}`,
  //   transform: `rotate(${"-16"}deg) scale(1,1)`,
  //   minWidth: "500px",
  //   overflow: "visible",  
  // }

  function setBranchSize() {

    // let currRotate = this.oneBranchStyle.transform.match(/(rotate)\(.*(deg)\)\s/)[0];
    let currMinWidth = parseInt(oneBranchStyle.minWidth.match(/\d+/g)[0]);

    oneBranchStyle.minWidth = `${currMinWidth * 0.66}`;
  
    // let currSizeX = currSize.match(/\d+\.?\d*(?=,)/)[0];
    // let currSizeY = currSize.match(/\d+\.?\d*/g)[1]; 

    // this.oneBranchStyle.transform = `${currRotate} scale(${currSizeX * 0.6},${currSizeY * 0.6})`
  }

  setBranchSize();

  function setBranchPositions(ind) {

    const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
  
    let currAngle = parseInt(oneBranchStyle.transform.match(/-*\d{1,3}/)[0]);

    // currAngle senses which way the previous branch turned, and alternates it to the other side by changing the rotation angle.
    // In non-trunk branches, it should sense the parent branch's angle to determine whether to use the CSS `left` or `right` positioning property. 
    if (initAngle > 0) {

      if ("left" in oneBranchStyle) {
        delete oneBranchStyle.left;
      }

      if (ind == 0) {
        oneBranchStyle.right = "0%"
      }
      const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 2);
      const currPlace = parseInt(oneBranchStyle.right.match(/\d+/)[0]);

      oneBranchStyle.right = `${currPlace + spacingUnit}%`
    }
    
    if (initAngle <= 0) {
      if ("right" in oneBranchStyle) {
        delete oneBranchStyle.right;
      }

      if (ind == 0) {
        oneBranchStyle.left = "0%"
      }
      const spacingUnit = parseInt(oneBranchStyle.minWidth.match(/\d+/)[0]) / (qtyBranches + 2);
      const currPlace = parseInt(oneBranchStyle.left.match(/\d+/)[0]);
      
      oneBranchStyle.left = `${currPlace + spacingUnit}%`
    }
    
    (currAngle > 0) ? 
      (
        oneBranchStyle.transform = `rotate(${currAngle - 36}deg) ${currScale}`
      ) : (
        oneBranchStyle.transform = `rotate(${currAngle + 36}deg) ${currScale}`
      )

      const styleLocalClone = Object.assign({}, oneBranchStyle);
      branchPositions.push(styleLocalClone);
      return styleLocalClone;
  }
  
  return(
    <section className="TreeBranch" style={props.style}>
      <PopoverPost {...restProps}>
        <img src={BranchHrzntl}>
        </img>
      </PopoverPost>
      {(typeof child_posts !== "undefined") ? 
        child_posts.map((post,ind)=>{
          return(
            <TreeBranch post={post} style={setBranchPositions(ind)}>
            </TreeBranch>
          )
        })
      : ""
      }
    </section>
  )
}

export default TreeBranch;
