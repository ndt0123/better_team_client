import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {ProgressBar} from 'react-bootstrap';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className={new Date() > new Date(this.props.task.due_date) ? "col-12 list mar-t-15p task-pass-due-date" : "col-12 list mar-t-15p"}>
        <div className="row pad-b-15p">
          <div className="float-left col-11 task-title"
            onClick={() => {
              this.props.openTaskDetailModal(this.props.task.id);
            }}>
            <span>{this.props.task.title}</span>
            {
              new Date() > new Date(this.props.task.due_date) ? 
                <label className="label pass-due-date">Pass due date</label> : ""
            }
          </div>
          <div className="float-right col-1 menu-icon">
            <div className="dropdown">
              <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <span className="dropdown-item">Assign to</span>
                <span className="dropdown-item">In progress</span>
                <span className="dropdown-item">Done</span>
                <span className="dropdown-item">Delete task</span>
              </div>
            </div>
          </div>  
        </div>
        <div className="mar-b-15p">
          <ProgressBar variant="warning"
            now={this.props.task.percentage_completed}
            label={this.props.task.percentage_completed + '%'} />
        </div>
        <div>
          <span className="assign">{this.props.task.assigned_user_name !== "" ? this.props.task.assigned_user_name : "No assigned"}</span>
          <span className={"priority " + this.props.task.priority + " float-right"}>
            {this.props.task.priority}
          </span>
        </div>               
      </div>
    );
  }
}

export default Task;
