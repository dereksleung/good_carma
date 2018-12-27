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

    this.state = {
      loading: true,
      tree: {}
    }
  }

  componentDidMount() {
    const startPostId = this.props.location.state.postId;
    Post.tree(startPostId)
      .then(res=>{
        this.setState({
          tree: res,
          loading: false
        });
        console.log("tree:", res);
      })
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
        position: "relative", 
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "white",
        mixBlendMode: "normal"
      }}>
        
        <section className="Trunk">
          <PopoverPost {...restProps}>
            <img src={Branch}>
            </img>
          </PopoverPost>

          {child_posts.length > 0 ? 
          child_posts.map(post=>{
            return(
              <TreeBranch post={post}
                style={{
                  position: "absolute",
                  left: `${"50%"}`,
                  bottom: `${"-30%"}`,
                  transform: `rotate(${"-16"}deg) scale(0.5,0.5)`,
                  minWidth: "500px",
                  overflow: "visible"
                }} >
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
