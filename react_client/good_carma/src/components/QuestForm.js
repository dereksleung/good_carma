import React, { Component } from "react";
import { Form, Button, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { Quest } from "../requests";

class QuestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quest: {},
      quest_goals: [],
      edit: false
    };

    this.addQuestGoal = this.addQuestGoal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fromFormData = this.fromFormData.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.location.state !== "undefined" && typeof this.props.match !== "undefined") {
      const id = this.props.match.params.id;
      Quest.one(id)
        .then(res=>{this.setState({
          quest: res,
          quest_goals: res.quest_goals
        })})
    }
  }

  addQuestGoal(event) {
    this.setState((prevState)=>{
      let { quest, quest_goals } = prevState;

      return {
        quest: {...quest},
        quest_goals: [...quest_goals, {}] 
      }
    })
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const classList = target.classList;
    // debugger;

    // Reactstrap necessitates a workaround here because <FormGroup> adds `form-control` or `form-check-input` to my <input> tag's classes silently. 
    // Fortunately, it takes the class I explicitly define first, which will be the names of the database columns, hence I want `classList[0]`.
    // The quest_goals' <input> tags have the database columns as classNames, whereas the quest's <input> tags only have the database columns as `name` attributes.
    let className;
    className = classList[0];

    if (["title", "description", "points", "repeatable", "max_repeats"].includes(className)) {
      let quest_goals = [...this.state.quest_goals];
      // debugger;
      quest_goals[target.dataset.id][className] = value;
      this.setState({
        quest_goals
      }, () => console.log(this.state.quest_goals) )
    } else {
      this.setState((prevState)=>{
        // debugger;
        let quest = {...prevState.quest};
        quest[name] = value;
        console.log("quest:", quest);
        console.log("prevState.quest =", prevState.quest);
        return {
          quest
        }
      });
    }
  }

  fromFormData(formData) {
    let newObj = {quest: {} };
    for (let [name, val] of formData.entries()) {
   
      newObj["quest"][name] = val;
    }
    return newObj;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    let newParamsObj = this.fromFormData(formData);
    debugger;
    newParamsObj.quest.quest_goals_attributes = this.state.quest_goals;
    console.log(newParamsObj);

    Quest.create(newParamsObj);
  }

  render() {

    const { quest, quest_goals } = this.state;
    
    return(
      <Form className="QuestForm" onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" id="" value={quest.title}></Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input type="textarea" name="description" id="" value={quest.description}></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="finished_bonus_points">Bonus Points on Finish</Label>
          <Input type="number" name="finished_bonus_points" id="" value={quest.finished_bonus_points}></Input>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" name="repeatable" id="" value={quest.repeatable}></Input>
          <Label check htmlFor="repeatable">Repeats allowed?</Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="max_repeats">Maximum Repeats</Label>
          <Input type="number" name="max_repeats" id="" value={quest.max_repeats}></Input>
        </FormGroup>

        {typeof quest_goals !== "undefined" ? 
          quest_goals.map((qg, idx) => {
            let qgId = `qg-${idx}`;
            return(
              <section key={`${idx}`}>
                <FormGroup>
                  <Label htmlFor={qgId}>Title</Label>
                  <Input type="text" name={qgId} data-id={idx} id="" value={quest_goals[idx].title} className="title"></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor={qgId}>Description</Label>
                  <Input type="textarea" name={qgId} data-id={idx} id="" value={quest_goals[idx].description} className="description"></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor={qgId}>Points</Label>
                  <Input type="number" name={qgId} data-id={idx} id="" value={quest_goals[idx].points} className="points"></Input>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" name={qgId} id="" data-id={idx} value={quest_goals[idx].repeatable} className="repeatable"></Input>
                  <Label check htmlFor="">Repeats allowed?</Label>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor={qgId}>Maximum Repeats</Label>
                  <Input type="number" name={qgId} data-id={idx} id="" value={quest_goals[idx].max_repeats} className="max_repeats"></Input>
                </FormGroup>
              </section>
            )
          })
          : ""
        }
        <Button onClick={this.addQuestGoal} >Add New Quest Goal</Button>

        <Input type="submit" value="Save Quest" className="btn btn-secondary"></Input>
      </Form>
    )
  }
}

export default QuestForm;