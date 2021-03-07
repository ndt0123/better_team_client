import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {ProgressBar} from 'react-bootstrap';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className="col-12 list mar-t-15p">
        <div className="row pad-b-15p">
          <div className="float-left col-11">
            <span>This is title of task 1 This is title of task 1</span>
            <span className="completion at_risk">At risk</span>
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
          <ProgressBar variant="warning" now={25} label={`25%`} />
        </div>
        <div>
          <span className="assign">Nguyen Duy Tam</span>
          <span className="priority high float-right">High</span>
        </div>               
      </div>
    );
  }
}

export default TaskList;
