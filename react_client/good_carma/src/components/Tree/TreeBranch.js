import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";
import InspirePopover from "./InspirePopover";
import BranchHrzntl from "./branchHrzntl.svg";
import Leaf from "./leaf-147490.svg";
import Apple from "./apple-2029586.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, calcStyle } = props;
  const { inspires } = restProps;
  const {cummltvAngle, ...trueCalcStyle} = calcStyle;

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
  
  // Fruits should always point down, and rotation is relative to the parent branch, so we only have to set fruit rotation angles once per branch. 
  // However, the x-position on the branch should track with the child branches, so we need to call setFruitPosition to clone oneBranchStyle with the child branch's position, then change the transform(rotate) property to our constant fruit rotation.
  const fruitRotate = parseInt(cummltvAngle); 

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

    // currRelatvAngle senses which way the previous branch turned. We alternate it to the other side by changing the rotation angle.
    
    if (ind == 0) {
      oneBranchStyle.left = "0%";
    }
    const spacingUnit = 100 / (qtyBranches + 1);
    const currPlace = parseInt(oneBranchStyle.left.match(/\d+/)[0]);
    
    oneBranchStyle.left = `${currPlace + spacingUnit}%`;
    
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

  function setFruitPosition(ind) {
    const currScale = oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
    const currAngle = parseInt(oneBranchStyle.transform.match(/-?\d{1,3}/)[0]);
    const cummltvAngle = parseInt(oneBranchStyle.cummltvAngle);
    const styleLocalClone = Object.assign({}, oneBranchStyle);
    // debugger;


    styleLocalClone.transform = `rotate(${fruitRotate * -1}deg)`;
    
    delete styleLocalClone.minWidth;
    styleLocalClone.maxWidth = "65px";
    
    if (cummltvAngle > -90) {   
      styleLocalClone.top = "50%";
    } else if (cummltvAngle < -90) {
      styleLocalClone.bottom = "50%";
    }
 
    
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
    // debugger;
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
        
        <img src={BranchHrzntl} style={{width: "100%"}}>
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
            <>

              <TreeBranch post={post} calcStyle={setBranchPositions(ind)}>
              </TreeBranch>
              <PopoverPost {...post}>
                <img src={Apple} style={setFruitPosition(ind)}>
                </img>
              </PopoverPost>
            </>
          )
        })
      : ""
      }
    </section>
  )
}

export default TreeBranch;
