import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser, faTrashAlt, faArchive, faBalanceScaleRight, faStream, faCogs } from "@fortawesome/free-solid-svg-icons";
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import {
  HOST,
  PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE,
} from "../../constant.js";

import ConfirmDeteleTaskModal from '../modals/task/confirm_delete_task_modal';
import SelectTaskAssignedModal from '../modals/task/select_task_assigned_modal';
import SelectTaskStatusModal from '../modals/task/select_task_status_modal';
import SelectTaskPriorityModal from '../modals/task/select_task_priority_modal';
import ConfirmFinishedModal from '../modals/task/confirm_finished_modal';

class Task extends Component {
  constructor(props) {
    super(props);
    this.updateTask = this.updateTask.bind(this);
    this.closeConfirmDeleteTaskModal = this.closeConfirmDeleteTaskModal.bind(this);
    this.closeSelectTaskAssignedModal = this.closeSelectTaskAssignedModal.bind(this);
    this.closeSelectTaskStatusModal = this.closeSelectTaskStatusModal.bind(this);
    this.closeSelectTaskPriorityModal = this.closeSelectTaskPriorityModal.bind(this);
    this.closeConfirmFinishedModal = this.closeConfirmFinishedModal.bind(this);
    this.state = {
      showConfirmDeleteTaskModal: {
        isShow: false,
        directAction: false
      },
      showSelectTaskAssignedModal: {
        isShow: false,
        directAction: false
      },
      showSelectTaskStatusModal: {
        isShow: false,
        directAction: false
      },
      showSelectTaskPriorityModal: {
        isShow: false,
        directAction: false
      },
      showConfirmFinishedModal: {
        isShow: false,
        directAction: false
      }
    }
  }

  closeConfirmDeleteTaskModal() {
    this.setState({
      showConfirmDeleteTaskModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  closeSelectTaskAssignedModal() {
    this.setState({
      showSelectTaskAssignedModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  closeSelectTaskStatusModal() {
    this.setState({
      showSelectTaskStatusModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  closeSelectTaskPriorityModal() {
    this.setState({
      showSelectTaskPriorityModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  closeConfirmFinishedModal() {
    this.setState({
      showConfirmFinishedModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  updateTask(data) {
    let taskId = this.props.task.id
    axios({
      method: 'post',
      url: HOST + 'api/v1/task/' + taskId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: data
    }).then((response) => {
      if (response.data.is_success) {
        this.props.updateListTask(PENDING_STATUS_VALUE, 1);
        this.props.updateListTask(IN_PROGRESS_STATUS_VALUE, 1);
        this.props.updateListTask(FINISHED_STATUS_VALUE, 1);
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
                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.props.openTaskDetailModal(this.props.task.id)
                  }}>
                  <FontAwesomeIcon icon={faCogs} className="fa-xs" />
                  <span>Edit</span>
                </div>

                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.setState({
                      showSelectTaskAssignedModal: {
                        isShow: true,
                        directAction: true
                      }
                    })
                  }}>
                  <FontAwesomeIcon icon={faUser} className="fa-xs" />
                  <span>Assign to</span>
                </div>

                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.setState({
                      showSelectTaskStatusModal: {
                        isShow: true,
                        directAction: true
                      }
                    })
                  }}>
                  <FontAwesomeIcon icon={faStream} className="fa-xs" />
                  <span>Change status</span>
                </div>

                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.setState({
                      showSelectTaskPriorityModal: {
                        isShow: true,
                        directAction: true
                      }
                    })
                  }}>
                  <FontAwesomeIcon icon={faBalanceScaleRight} className="fa-xs" />
                  <span>Change priority</span>
                </div>

                {
                  this.props.task.status !== 'finished' ?
                    <div className="action-item dropdown-item warning"
                      onClick={() => {
                        this.setState({
                          showConfirmFinishedModal: {
                            isShow: true,
                            directAction: true
                          }
                        })
                      }}>
                      <FontAwesomeIcon icon={faArchive} className="fa-xs" />
                      <span>Move to finished</span>
                    </div> : ""
                }

                <div className="action-item dropdown-item warning"
                  onClick={() => {
                    this.setState({
                      showConfirmDeleteTaskModal: {
                        isShow: true,
                        directAction: true
                      }
                    })
                  }}>
                  <FontAwesomeIcon icon={faTrashAlt} className="fa-xs" />
                  <span>Delete task</span>
                </div>
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

        <ConfirmDeteleTaskModal showModal={this.state.showConfirmDeleteTaskModal.isShow}
          closeModal={this.closeConfirmDeleteTaskModal}
          directAction={this.state.showConfirmDeleteTaskModal.directAction}
          updateTask={this.updateTask}
        />
        <SelectTaskAssignedModal showModal={this.state.showSelectTaskAssignedModal.isShow}
          closeModal={this.closeSelectTaskAssignedModal}
          workspaceId={this.props.workspaceId}
          assignedId={this.props.task.assigned_user_id}
          directAction={this.state.showSelectTaskAssignedModal.directAction}
          updateTask={this.updateTask}
        />
        <SelectTaskStatusModal showModal={this.state.showSelectTaskStatusModal.isShow}
          closeModal={this.closeSelectTaskStatusModal}
          status={this.props.task.status}
          directAction={this.state.showSelectTaskStatusModal.directAction}
          updateTask={this.updateTask}
        />
        <SelectTaskPriorityModal showModal={this.state.showSelectTaskPriorityModal.isShow}
          closeModal={this.closeSelectTaskPriorityModal}
          priority={this.props.task.priority}
          directAction={this.state.showSelectTaskPriorityModal.directAction}
          updateTask={this.updateTask}
        />
        <ConfirmFinishedModal showModal={this.state.showConfirmFinishedModal.isShow}
          closeModal={this.closeConfirmFinishedModal}
          directAction={this.state.showConfirmFinishedModal.directAction}
          updateTask={this.updateTask}
        />
      </div>
    );
  }
}

export default Task;
