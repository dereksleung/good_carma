import React from "react";
import { LeaderBoard } from "../requests";
import { Link } from "react-router-dom";

const NewcomersPanel = (props) => {

  // let newcomers = {};

  // LeaderBoard.loadMain()
  //   .then(data=>(
  //     newcomers = data
  //   ))
  //   .then(result=>{
    
      
      return(
        <section className="NewcomersPanel p-3">
          <strong style={{  
            overflow: "hidden",
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap",
            marginBottom: "1em"}} className="mb-4">Newcomers to Check Out</strong>
          <p style={{fontSize: "0.9em"}}>New Blood</p>
          <section id="new-blood-group">
            {props.new_posters.map(user=>{
              return(
                <Link className="d-flex flex-column mb-2" to={`/users/${user.full_name}`}>
                  <section className="d-flex flex-row">
                    <img src={user.avatar} className="mr-2"></img>
                    <span className="flex-grow-1" style={{fontSize:"0.8em"}}>{user.full_name}</span>
                  </section>
                </Link>
              )
            })}
          </section>
          <section id="up-and-comings-group">
            <p style={{fontSize: "0.9em"}}>Up and Comings</p>
            {props.arr_two_wk.map(user=>{
              return(
                <Link className="d-flex flex-column" to={`/users/${user.full_name}`}>
                  <section className="d-flex flex-row">
                    <img src={user.avatar} className="mr-2"></img>
                    <span className="flex-grow-1" style={{fontSize:"0.8em"}}>{user.full_name}</span>
                  </section>
                </Link>
              )
            })}
          </section>
        </section>
      )
}

export default NewcomersPanel;