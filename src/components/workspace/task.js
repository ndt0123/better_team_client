import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import {
  HOST
} from "../../constant.js";

import ConfirmDeteleTaskModal from '../modals/task/confirm_delete_task_modal';

class Task extends Component {
  constructor(props) {
    super(props);
    this.closeConfirmDeleteTaskModal = this.closeConfirmDeleteTaskModal.bind(this);
    this.confirmDeteleTask = this.confirmDeteleTask.bind(this);
    this.state = {
      showConfirmDeleteTaskModal: false
    }
  }

  closeConfirmDeleteTaskModal() {
    this.setState({
      showConfirmDeleteTaskModal: false
    })
  }

  confirmDeteleTask() {
    let taskId = this.props.task.id
    axios({
      method: 'post',
      url: HOST + 'api/v1/task/' + taskId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        status: 'deleted',
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.props.updateListTask(this.props.task.status, 1);
        this.closeConfirmDeleteTaskModal();
      }
    }).catch((error) => {
      console.log(error);
    })
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
                <span className="dropdown-item"
                  onClick={() => {
                    this.props.openTaskDetailModal(this.props.task.id)
                  }}  
                >Setting</span>
                <span className="dropdown-item"
                  onClick={() => {
                    this.setState({
                      showConfirmDeleteTaskModal: true
                    })
                  }}
                >Delete task</span>
              </div>
            </div>
          </div>  
        </div>
        <div className="mar-b-15p">
          <ProgressBar
            variant={this.props.task.percentage_completed < 20 ?
              "danger" : 
              this.props.task.percentage_completed >= 20
              && this.props.task.percentage_completed < 60 ?
              "warning" : "info"}
            now={this.props.task.percentage_completed}
            label={this.props.task.percentage_completed + '%'} />
        </div>
        <div>
          <span className="assign">{this.props.task.assigned_user_name !== "" ? this.props.task.assigned_user_name : "No assigned"}</span>
          <span className={"priority " + this.props.task.priority + " float-right"}>
            {this.props.task.priority}
          </span>
        </div>


        <ConfirmDeteleTaskModal showModal={this.state.showConfirmDeleteTaskModal}
          closeModal={this.closeConfirmDeleteTaskModal}
          confirmDeteleTask={this.confirmDeteleTask}
        />
      </div>
    );
  }
}

export default Task;
