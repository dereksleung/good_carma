import React, { Component } from "react";
import { Container } from "reactstrap";
import { Post } from "../../requests";
import BranchHrzntl from "./branchHrzntl.svg";
import TreeBranch from "./TreeBranch";
import PopoverPost from "./PopoverPost";
import Leaf from "./RealisticLeaves.svg";
import InspirePopover from "./InspirePopover";
import Apple from "./apple-2029586.svg";
import TreeBush from "./TreeBush.svg";
import Background from "./Background.svg";

class Tree extends Component {
  constructor(props) {
    super(props);

    this.initAngle = -90;
    this.branchPositions = [];
    this.qtyBranches = 0;
    this.qtyLeaves = 0;
    this.oneBranchStyle = {
      display: "inline-block",
      position: "absolute",
      left: `${"0%"}`,
      bottom: `${"0%"}`,
      transform: `rotate(${["","-"][Math.round(Math.random())]}70deg) scale(1,1)`,
      transformOrigin: "center left",
      minWidth: "100vh",
      maxWidth: "100vh",
      minHeight: "auto",
      overflow: "visible", 
      cummltvAngle: "" 
    }
    this.oneLeafStyle = {
      position: "absolute",
      display: "inline-block",
      height: "50px",
      width: "30px",
      left: "0%",
      bottom: "50%",
      transformOrigin: "bottom left",
      transform: `scaleY(${["","-"][Math.round(Math.random())]}1)`
    }

    this.state = {
      loading: true,
      tree: {}
    }

    this.setBranchPositions = this.setBranchPositions.bind(this);
    this.setBranchSize = this.setBranchSize.bind(this);
    this.setLeafPosition = this.setLeafPosition.bind(this);
    this.setFruitPosition = this.setFruitPosition.bind(this);
  }

  componentDidMount() {
    const startPostId = this.props.match.params.id;
    Post.tree(startPostId)
      .then(res=>{
        this.setState({
          tree: res,
          loading: false
        });
        console.log("tree:", res);
      })
      
      this.setBranchSize();

    
  }

  setBranchSize() {
    const currRotate = this.oneBranchStyle.transform.match(/(rotate)\(.*(deg)\)\s/)[0];
    const currScale = this.oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
  
    const currScaleX = parseFloat(currScale.match(/\d+\.?\d*(?=,)/)[0]);
    const currScaleY = parseFloat(currScale.match(/\d+\.?\d*/g)[1]); 

    this.oneBranchStyle.transform = `${currRotate} scale(${currScaleX * 0.6},${currScaleY * 0.6})`;
  }

  setBranchPositions(ind) {

    const currScale = this.oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
    const currAngle = parseInt(this.oneBranchStyle.transform.match(/-?\d{1,3}/)[0]);

    if (typeof this.state.tree.child_posts !== "undefined") {
      this.qtyBranches = this.state.tree.child_posts.length;  
    } else {
      this.qtyBranches = 0;
    }
  
    // currAngle senses which way the previous branch turned, and alternates it to the other side by changing the rotation angle.
    // For the trunk, since we're using rotate(-90deg), we should use the CSS `left` property to place branches from the bottom up.

    if (ind === 0 && currAngle > 0) {
      this.oneBranchStyle.left = "0%";
      this.oneBranchStyle.cummltvAngle = -20;
    } else if (ind === 0 && currAngle < 0) {
      this.oneBranchStyle.left = "0%";
      this.oneBranchStyle.cummltvAngle = -160;
    }
    
    const spacingUnit = 100 / (this.qtyBranches + 1);

    const currPlace = parseInt(this.oneBranchStyle.left.match(/\d+/)[0]);

    this.oneBranchStyle.left = `${currPlace + spacingUnit}%`;

    // debugger;
    
    if (currAngle > 0) {
      this.oneBranchStyle.transform = `rotate(${currAngle - 140}deg) ${currScale}`;
      this.oneBranchStyle.cummltvAngle -= 140;
    } else {
      this.oneBranchStyle.transform = `rotate(${currAngle + 140}deg) ${currScale}`;
      this.oneBranchStyle.cummltvAngle += 140;
    }

    const styleLocalClone = Object.assign({}, this.oneBranchStyle);
    // this.branchPositions.push(styleLocalClone);
    return styleLocalClone;
  }

  setFruitPosition(ind) {
    const currScale = this.oneBranchStyle.transform.match(/(scale)\(\d*.?\d{1,3},{1}\d*.?\d{1,3}\)/g)[0];
    const styleLocalClone = Object.assign({}, this.oneBranchStyle);
    styleLocalClone.transform = `rotate(90deg) ${currScale}`;
    styleLocalClone.left = `${parseInt(styleLocalClone.left.match(/\d+/)[0])-5}%`
    delete styleLocalClone.minWidth;
    styleLocalClone.maxWidth = "65px";

    return styleLocalClone;
  }
    
  setLeafPosition(ind) {

    const currScale = this.oneLeafStyle.transform.match(/(scaleY)\(-?/g)[0];
    const currFlip = currScale[7];

    if (typeof this.state.tree.inspires !== "undefined") {
      this.qtyLeaves = this.state.tree.inspires.length;  
    } else {
      this.qtyLeaves = 0;
    }

    if (ind === 0) {
      this.oneLeafStyle.left = "0%";
    }

    const spacingUnit = parseInt(`${100 / this.qtyLeaves}`);
    const currPlace = parseInt(this.oneLeafStyle.left.match(/\d+/)[0]);

    this.oneLeafStyle.left = `${currPlace + spacingUnit}%`;
    
    if (currFlip === "-") {
      this.oneLeafStyle.transform = "scaleY(1)";
    } else {
      this.oneLeafStyle.transform = "scaleY(-1)";
    }

    const styleLocalClone = Object.assign({}, this.oneLeafStyle);
    return styleLocalClone;
  }

  

  render() {
    const { tree } = this.state;
    const { child_posts, inspires, ...restProps } = tree;
    let divSize;
    let bushSize;
    let trunkSize;

    if (typeof child_posts != "undefined") {
      bushSize = `${1.2 * child_posts.length * 25}vh`;
      divSize = `${1.5 * child_posts.length * 25}vh`;
      trunkSize = `${0.7 * child_posts.length * 25}vh`;
      if (window.innerWidth < 900) {
        bushSize = `${1.2 * child_posts.length * 25}vh`;
        trunkSize = `${0.5 * child_posts.length * 25}vh`;
      } else if (window.innerWidth < 350) {
        bushSize = `${1.2 * child_posts.length * 25}vh`;
      }
    } else {
      bushSize = "25vh";
      divSize = `${1.5 * 25}vh`;
      trunkSize = `${0.7 * 25}vh`;
      if (window.innerWidth < 900) {
        trunkSize = `${0.5 * 25}vh`;  
      } else if (window.innerWidth < 350) {
        bushSize = `${2 * 25}vh`;
      }
    }

    this.oneBranchStyle.minWidth = trunkSize;
    this.oneBranchStyle.maxWidth = trunkSize;

    if (this.state.loading) {
      return(
        <h3>Loading...</h3>
      )
    }
      
    return(
      <Container className="Tree container-fluid" style={{
        display: "inline-block",
        position: "relative", 
        minHeight: "100vh",
        height: `${divSize}`,
        minWidth: "100vw",
        width: `${divSize}`,
        backgroundColor: "#29e0ff",
        backgroundImage: `url(${Background})`,
        backgroundSize: "100%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        mixBlendMode: "normal"
      }}>
        <section className="TreeBush" style={{
          display: "inline-block",
          position: "absolute",
          bottom: "0%", 
          left: "50%",
          transform: "translate(-50%, 0%)",
          height: `${bushSize}`,
          minWidth: `${bushSize}`,
          backgroundImage: `url(${TreeBush})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          mixBlendMode: "normal"
        }}>
        
          <section className="Trunk" style={{
            display: "inline-block",
            position: "absolute",
            left: "50%",
            bottom: "0%",
            transform: `rotate(-90deg)`,
            transformOrigin: "center left",
            minWidth: `${trunkSize}`,
            maxWidth: `${trunkSize}`,
            overflow: "visible"  
          }}>
            <PopoverPost {...restProps}>
              <img src={BranchHrzntl} alt="tree branch which shows a post's content when you hover over it" style={{maxWidth: "100%"}}>
              
              </img>
            </PopoverPost>

            {inspires.length > 0 ? 
              inspires.map((insp,ind)=>{
                return(
                  <InspirePopover calcStyle={this.setLeafPosition(ind)} {...insp}>
                    <img src={Leaf} alt="leaf that shows someone you Inspired when you hover over it">
                    </img>
                  </InspirePopover>
                )
              }) : ""
            }

            {child_posts.length > 0 ? 
              child_posts.map((post,ind)=>{ 
                return(
                  <>
                    <TreeBranch post={post}
                    calcStyle={this.setBranchPositions(ind)} >
                    </TreeBranch>
                    <PopoverPost {...post}>
                      <img src={Apple} style={this.setFruitPosition(ind)} alt="fruit that shows your action helped Inspire someone else to action themselves. Shows post content when you hover over it.">
                      </img>
                    </PopoverPost>
                  </>
                )
              }) : ""
            }
          </section>
        </section>
      </Container>
    )
  }
}

export default Tree;
