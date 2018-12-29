class Tree {
  constructor(props) {
    this.props = props;

    this.branchPositions = [];
    this.qtyBranches = 0;
    this.oneBranchStyle = {
      position: "absolute",
      left: `${"50%"}`,
      bottom: `${"-30%"}`,
      transform: `rotate(-16deg) scale(1,1)`,
      minWidth: "500px",
      overflow: "visible",  
    }

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

  setBranchSize() {
    let currRotate = this.oneBranchStyle.transform.match(/(rotate)\(.*(deg)\)\s/)[0];
    let currSize = this.oneBranchStyle.transform.match(/\d+\.*\d*,{1}\d+\.*\d*/)[0];
    let currSizeX = currSize.match(/\d+\.?\d*(?=,)/)[0];
    let currSizeY = currSize.match(/\d+\.?\d*/)[1]; 

    this.oneBranchStyle.transform = `${currRotate} scale(${currSizeX * 0.6},${currSizeY * 0.6})`
  }
}