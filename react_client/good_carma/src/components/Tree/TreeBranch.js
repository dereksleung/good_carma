import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";
import InspirePopover from "./InspirePopover";
import BranchHrzntl from "./branchHrzntl.svg";
import Leaf from "./leaf-147490.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, calcStyle } = props;
  const { inspires } = restProps;
  const {cummltvAngle, ...trueCalcStyle} = calcStyle;
  // debugger;
  let qtyBranches;
  if (typeof child_posts !== "undefined") {
    qtyBranches = child_posts.length;
  } else {
    qtyBranches = 0;
  }

  let qtyLeaves;
  if (typeof inspires !== "undefined") {
    qtyLeaves = inspires.length;
  } else {
    qtyLeaves = 0;
  }

  let branchPositions = [];

  let oneBranchStyle = calcStyle;
  let oneLeafStyle = {
    position: "absolute",
      display: "inline-block",
      height: "50px",
      width: "30px",
      left: "0%",
      bottom: "50%",
      transformOrigin: "bottom left",
      transform: `scale(0.6,${["","-"][Math.round(Math.random())]}0.6)`
  }

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

  function setLeafPosition(ind) {

    const currScaleX = oneLeafStyle.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)[0];
    const currScaleY = parseFloat(oneLeafStyle.transform.match(/[-+]?[0-9]*\.?[0-9]+/g)[1]);
 
    const currFlip = currScaleY[0];

    if (typeof inspires !== "undefined") {
      qtyLeaves = inspires.length;  
    } else {
      qtyLeaves = 0;
    }

    if (ind == 0) {
      oneLeafStyle.left = "0%";
    }

    const spacingUnit = parseInt(`${100 / qtyLeaves}`);
    const currPlace = parseInt(oneLeafStyle.left.match(/\d+/)[0]);

    oneLeafStyle.left = `${currPlace + spacingUnit}%`;
    debugger;
    // if (currFlip === "-") {
      oneLeafStyle.transform = `scale(${currScaleX},${currScaleY * -1})`;
    // } else {
    //   oneLeafStyle.transform = `scaleY(-1)`;
    // }

    const styleLocalClone = Object.assign({}, oneLeafStyle);
    return styleLocalClone;
  }

  
  return(
    <section className="TreeBranch" style={trueCalcStyle}>
      <PopoverPost {...restProps}>
        <img src={BranchHrzntl}>
        </img>
      </PopoverPost>
      {typeof inspires !== "undefined" ? 
        inspires.map((insp, ind)=> {
          return(
          <InspirePopover calcStyle={setLeafPosition(ind)} {...insp}>
            <img src={Leaf}>
            </img>
          </InspirePopover>
          )
        })
      : ""
      }
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
