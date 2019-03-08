import React from "react";
import PopoverPost from "./PopoverPost";
import InspirePopover from "./InspirePopover";
import BranchHrzntl from "./branchHrzntl.svg";
import Leaf from "./leaf-147490.svg";
import Apple from "./apple-2029586.svg";

const TreeBranch = (props) => {

  const { post: { child_posts, ...restProps }, calcStyle } = props;
  const { inspires } = restProps;
  const {cummltvAngle, ...trueCalcStyle} = calcStyle;
  // trueCalcStyle is the style given to the current branch, after removing non-CSS keys like cummltvAngle

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

  // I use calcStyle here because it contains the tracked cummltvAngle, which 
  let oneBranchStyle = calcStyle;
  
  // Fruits should always point down, and rotation is relative to the parent branch, so we only have to set fruit rotation angles once per branch. 
  // For now, the fruit's x-position on the branch tracks close to the child branches. I call setFruitPosition to clone oneBranchStyle with the child branch's position, then change the transform(rotate) property to our constant fruit rotation.
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
    
    if (ind === 0) {
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
    const cummltvAngle = parseInt(oneBranchStyle.cummltvAngle);
    const styleLocalClone = Object.assign({}, oneBranchStyle);

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
    if (typeof inspires !== "undefined") {
      qtyLeaves = inspires.length;  
    } else {
      qtyLeaves = 0;
    }

    if (ind === 0) {
      oneLeafStyle.left = "0%";
    }

    const spacingUnit = parseInt(`${100 / qtyLeaves}`);
    const currPlace = parseInt(oneLeafStyle.left.match(/\d+/)[0]);

    oneLeafStyle.left = `${currPlace + spacingUnit}%`;
    oneLeafStyle.transform = `scale(${currScaleX},${currScaleY * -1})`;

    const styleLocalClone = Object.assign({}, oneLeafStyle);
    return styleLocalClone;
  }

  
  return(
    <section className="TreeBranch" style={trueCalcStyle}>
      <PopoverPost {...restProps}>
        <img src={BranchHrzntl} style={{width: "100%"}} alt="tree branch that shows post content when hovered over">
        </img>
      </PopoverPost>
      {typeof inspires !== "undefined" ? 
        inspires.map((insp, ind)=> {
          return(
          <InspirePopover calcStyle={setLeafPosition(ind)} {...insp} >
            <img src={Leaf} alt="leaf that shows someone you Inspired when you hover over it">
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
                <img src={Apple} style={setFruitPosition(ind)} alt="fruit that shows your action helped Inspire someone else to action themselves. Shows post content when you hover over it.">
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
