import React, { Component } from "react";
import { Confirm } from "../requests";
import { UncontrolledAlert } from "reactstrap";

class ConfirmCompany extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirming: true,
      message: ""
    }
  }

  componentDidMount() {
    const confirmToken = this.props.match.params.id;
    Confirm.company(confirmToken)
      .then(data=>{
        this.setState({
          confirming: false,
          message: data.message
        });
      });
  }

  render() {
    return(
      <section className="ConfirmCompany" style={{minHeight: "100vh"}}>
        {this.state.confirming === false ? 
          <UncontrolledAlert color="info">{this.state.message}</UncontrolledAlert> 
          : 
          <h3>Confirming...</h3>
        }
      </section>
    )
  }
}

export default ConfirmCompany;