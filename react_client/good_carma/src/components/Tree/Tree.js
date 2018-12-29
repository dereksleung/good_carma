import React, { Component } from "react";
import { Post } from "../../requests";
import Branch from "./branch.svg";
import BranchHrzntl from "./branchHrzntl.svg";
import TreeBranch from "./TreeBranch";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PopoverPost from "./PopoverPost";

class Tree extends Component {
  constructor(props) {
    super(props);

    this.initAngle = -90;
    this.branchPositions = [];
    this.qtyBranches = 0;
    this.oneBranchStyle = {
      display: "inline-block",
      position: "absolute",
      left: `${"0%"}`,
      bottom: `${"50%"}`,
      transform: `rotate(${["","-"][Math.round(Math.random())]}70deg) scale(1,1)`,
      transformOrigin: "center left",
      minWidth: "500px",
      minHeight: "auto",
      overflow: "visible", 
      cummltvAngle: -20 
    }

    this.state = {
      loading: true,
      tree: {}
    }

    this.setBranchPositions = this.setBranchPositions.bind(this);
    this.setBranchSize = this.setBranchSize.bind(this);
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

    // let currRotate = this.oneBranchStyle.transform.match(/(rotate)\(.*(deg)\)\s/)[0];
    let currMinWidth = parseInt(this.oneBranchStyle.minWidth.match(/\d+/g)[0]);

    this.oneBranchStyle.minWidth = `${currMinWidth * 0.66}`
  
    // let currSizeX = currSize.match(/\d+\.?\d*(?=,)/)[0];
    // let currSizeY = currSize.match(/\d+\.?\d*/g)[1]; 

    // this.oneBranchStyle.transform = `${currRotate} scale(${currSizeX * 0.6},${currSizeY * 0.6})`
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
    // In non-trunk branches, it should sense the parent branch's angle to determine whether to use the CSS `left` or `right` positioning property. 
    // For the trunk, since we're using rotate(-90deg), we should use the CSS `left` property to place branches from the bottom up.

    if (ind == 0) {
      this.oneBranchStyle.left = "0%";
    }
    const spacingUnit = parseInt(this.oneBranchStyle.minWidth.match(/\d+/)[0]) / (this.qtyBranches + 1);

    const currPlace = parseInt(this.oneBranchStyle.left.match(/\d+/)[0]);

    this.oneBranchStyle.left = `${currPlace + spacingUnit}px`;
    
    if (currAngle > 0) {
      this.oneBranchStyle.transform = `rotate(${currAngle - 140}deg) ${currScale}`;
      this.oneBranchStyle.cummltvAngle -= 140;
    } else {
      this.oneBranchStyle.transform = `rotate(${currAngle + 140}deg) ${currScale}`;
      this.oneBranchStyle.cummltvAngle += 140;
    }

    const styleLocalClone = Object.assign({}, this.oneBranchStyle);
    this.branchPositions.push(styleLocalClone);
    return styleLocalClone;
  }
    

  render() {
    const { tree } = this.state;
    const { child_posts, ...restProps } = tree;

    if (this.state.loading) {
      return(
        <h3>Loading...</h3>
      )
    }
      
    return(
      <section className="Tree" style={{
        display: "inline-block",
        position: "relative", 
        minHeight: "150vh",
        minWidth: "100vw",
        backgroundColor: "white",
        mixBlendMode: "normal"
      }}>
        
        <section className="Trunk" style={{
          display: "inline-block",
          position: "absolute",
          left: `${"50%"}`,
          bottom: `${"0%"}`,
          transform: `rotate(${"-90"}deg)`,
          transformOrigin: "center left",
          minWidth: "100vw",
          overflow: "visible"  
        }}>
          <PopoverPost {...restProps}>
            <img src={BranchHrzntl} >
            
            </img>
          </PopoverPost>

            {child_posts.length > 0 ? 
              child_posts.map((post,ind)=>{ 
                return(
                  <TreeBranch post={post}
                    calcStyle={this.setBranchPositions(ind)} >
                  </TreeBranch>
                )
              }) : ""
            }
        </section>
      </section>
    )
  }
}

export default Tree;