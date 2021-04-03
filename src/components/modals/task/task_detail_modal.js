import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';

import SelectTaskAssignedModal from './select_task_assigned_modal';
import SelectTaskStatusModal from './select_task_status_modal';
import SelectTaskPriorityModal from './select_task_priority_modal';

import {
  HOST,
  PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE,
  LOW_PRIORITY_VALUE,
  NORMAL_PRIORITY_VALUE,
  HIGH_PRIORITY_VALUE
} from "../../../constant.js";
import defaultAvatar from '../../../images/default-avatar.jpg';

class TaskDetailModal extends Component {
  constructor(props) {
    super(props);
    this.getTaskDetail = this.getTaskDetail.bind(this);
    this.getTaskHistories = this.getTaskHistories.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePercentageCompleted = this.onChangePercentageCompleted.bind(this);
    this.onClickAssignTo = this.onClickAssignTo.bind(this);
    this.closeAssignTaskModal = this.closeAssignTaskModal.bind(this);
    this.getTaskStatus = this.getTaskStatus.bind(this);
    this.getTaskPriority = this.getTaskPriority.bind(this);
    this.closeSelectTaskStatusModal = this.closeSelectTaskStatusModal.bind(this);
    this.onClickStatus = this.onClickStatus.bind(this);
    this.closeSelectTaskPriorityModal = this.closeSelectTaskPriorityModal.bind(this);
    this.onClickPriority = this.onClickPriority.bind(this);
    this.getNewStatus = this.getNewStatus.bind(this);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.getNewPriority = this.getNewPriority.bind(this);
    this.getNewAssigned = this.getNewAssigned.bind(this);
    this.state = {
      showAssignTaskModal: false,
      showSelectTaskStatusModal: false,
      showSelectTaskPriorityModal: false,
      headerOption: 'detail',
      taskDetail: {},
      taskHistories: [],
      isEditTask: false,
      errorTaskServer: '',
      title: {value: '', error: '', canSubmit: true},
      description: {value: '', error: '', canSubmit: true},
      assigned: {value: 0, fullName: '', error: '', canSubmit: true},
      priority: {value: '', error: '', canSubmit: true},
      status: {value: '', error: '', canSubmit: true},
      dueDate: {value: '', error: '', canSubmit: true},
      startDate: {value: '', error: '', canSubmit: true},
      percentageCompleted: {value: 0, error: '', canSubmit: true}
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getTaskDetail();
      this.getTaskHistories();
    }
  }

  getTaskDetail() {
    let taskId = this.props.id
    axios({
      method: 'get',
      url: HOST + 'api/v1/task/' + taskId + '/detail',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          taskDetail: response.data.task_detail,
          isEditTask: false,
          title: {value: response.data.task_detail.title, error: '', canSubmit: true},
          description: {value: response.data.task_detail.description, error: '', canSubmit: true},
          assigned: {
            value: response.data.task_detail.assigned_user_id,
            fullName: response.data.task_detail.assigned_user_name,
            error: '',
            canSubmit: true
          },
          priority: {value: response.data.task_detail.priority, error: '', canSubmit: true},
          status: {value: response.data.task_detail.status, error: '', canSubmit: true},
          dueDate: {value: response.data.task_detail.due_date, error: '', canSubmit: true},
          startDate: {value: response.data.task_detail.start_date, error: '', canSubmit: true},
          percentageCompleted: {value: response.data.task_detail.percentage_completed, error: '', canSubmit: true}
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  getTaskHistories() {
    let taskId = this.props.id
    axios({
      method: 'get',
      url: HOST + 'api/v1/task/' + taskId + '/task_history',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          taskHistories: response.data.task_histories
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  updateTask() {
    let taskId = this.props.id
    axios({
      method: 'post',
      url: HOST + 'api/v1/task/' + taskId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        title: this.state.title.value,
        description: this.state.description.value,
        assigned_user_id: this.state.assigned.value,
        priority: this.state.priority.value,
        status: this.state.status.value,
        due_date: this.state.dueDate.value,
        start_date: this.state.startDate.value,
        percentage_completed: this.state.percentageCompleted.value
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          taskDetail: response.data.task_detail,
          isEditTask: false,
          title: {value: response.data.task_detail.title, error: '', canSubmit: true},
          description: {value: response.data.task_detail.description, error: '', canSubmit: true},
          assigned: {
            value: response.data.task_detail.assigned_user_id,
            fullName: response.data.task_detail.assigned_user_name,
            error: '',
            canSubmit: true
          },
          priority: {value: response.data.task_detail.priority, error: '', canSubmit: true},
          status: {value: response.data.task_detail.status, error: '', canSubmit: true},
          dueDate: {value: response.data.task_detail.due_date, error: '', canSubmit: true},
          startDate: {value: response.data.task_detail.start_date, error: '', canSubmit: true},
          percentageCompleted: {value: response.data.task_detail.percentage_completed, error: '', canSubmit: true},
          isEditTask: false,
          errorTaskServer: ''
        })
        this.props.updateListTask(PENDING_STATUS_VALUE, 1);
        this.props.updateListTask(IN_PROGRESS_STATUS_VALUE, 1);
        this.props.updateListTask(FINISHED_STATUS_VALUE, 1);
      } else {
        this.setState({
          errorTaskServer: response.data.message
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onClickSaveButton() {
    if (this.state.title.canSubmit && this.state.description.canSubmit
      && this.state.startDate.canSubmit && this.state.dueDate.canSubmit) {
      this.updateTask();
    }
  }

  onChangeStartDate = (e) => {
    let error = '';
    let canSubmit = true;
    let errorDueDate = '';
    let canSubmitDueDate = true;
    if (e.target.value.trim() === '') {
      error = 'Start date can not be blank.';
      canSubmit = false;
    } else if (new Date(e.target.value) > new Date(this.state.dueDate.value)) {
      error = 'Start date can not greater than due date.';
      errorDueDate = '';
      canSubmit = false;
      canSubmitDueDate = false;
    }
    this.setState({
      startDate: {
        value: e.target.value,
        error: error,
        canSubmit: canSubmit
      },
      dueDate: {
        value: this.state.dueDate.value,
        error: errorDueDate,
        canSubmit: canSubmitDueDate
      }
    })
  }

  onChangeDueDate = (e) => {
    let error = '';
    let canSubmit = true;
    let errorStartDate = '';
    let canSubmitStartDate = true;
    if (e.target.value.trim() === '') {
      error = 'Due date can not be blank.';
      canSubmit = false;
    } else if (new Date(e.target.value) < new Date(this.state.startDate.value)) {
      error = 'Due date can not less than start date.';
      canSubmit = false;
      errorStartDate = '';
      canSubmitStartDate = false;
    }
    this.setState({
      dueDate: {
        value: e.target.value,
        error: error,
        canSubmit: canSubmit
      },
      startDate: {
        value: this.state.startDate.value,
        error: errorStartDate,
        canSubmit: canSubmitStartDate
      }
    })
  }

  onChangeTitle = (e) => {
    let error = '';
    let canSubmit = true;
    if (e.target.value.trim() === '') {
      error = "Title can't be blank.";
      canSubmit = false;
    }
    this.setState({
      title: {
        value: e.target.value,
        error: error,
        canSubmit: canSubmit
      }
    })
  }

  onChangeDescription = (e) => {
    let error = '';
    let canSubmit = true;
    if (e.target.value.trim() === '') {
      error = "Description can't be blank.";
      canSubmit = false;
    }
    this.setState({
      description: {
        value: e.target.value,
        error: error,
        canSubmit: canSubmit
      }
    })
  }

  onChangePercentageCompleted = (e) => {
    this.setState({
      percentageCompleted: {
        value: e.target.value,
        error: '',
        canSubmit: true
      }
    })
  }

  getNewStatus(status) {
    this.setState({
      status: {
        value: status,
        error: '',
        canSubmit: true
      }
    })
  }

  getNewPriority(priority) {
    this.setState({
      priority: {
        value: priority,
        error: '',
        canSubmit: true
      }
    })
  }

  getNewAssigned(id, fullName) {
    this.setState({
      assigned: {
        value: id,
        fullName: fullName,
        error: '',
        canSubmit: true
      }
    })
  }

  onClickAssignTo() {
    if (this.state.isEditTask) {
      this.setState({
        showAssignTaskModal: true
      })
    }
  }

  closeAssignTaskModal() {
    this.setState({
      showAssignTaskModal: false
    })
  }

  onClickStatus() {
    if (this.state.isEditTask) {
      this.setState({
        showSelectTaskStatusModal: true
      })
    }
  }

  closeSelectTaskStatusModal() {
    this.setState({
      showSelectTaskStatusModal: false
    })
  }

  onClickPriority() {
    if (this.state.isEditTask) {
      this.setState({
        showSelectTaskPriorityModal: true
      })
    }
  }

  closeSelectTaskPriorityModal() {
    this.setState({
      showSelectTaskPriorityModal: false
    })
  }

  getTaskStatus(status) {
    switch(status) {
      case PENDING_STATUS_VALUE:
        return 'Pending';
      case IN_PROGRESS_STATUS_VALUE:
        return 'In Progress';
      case FINISHED_STATUS_VALUE:
        return 'Finished';
      default:
        return 'Deleted';
    }
  }

  getTaskPriority(priority) {
    switch(priority) {
      case LOW_PRIORITY_VALUE:
        return 'Low';
      case NORMAL_PRIORITY_VALUE:
        return 'Normal';
      case HIGH_PRIORITY_VALUE:
        return 'High';
      default:
        return '';
    }
  }

  render() {
    const Status = () => (
      this.state.isEditTask ?
        <div onClick={this.onClickStatus}>
          <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.status.value + "-icon"} />
          {this.getTaskStatus(this.state.status.value)}
          <FontAwesomeIcon icon={faChevronDown}
              className="fa-xs gray-icon display-inline-block" />
        </div> :
        <div onClick={this.onClickStatus}>
          <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.taskDetail.status + "-icon"} />
          {this.getTaskStatus(this.state.taskDetail.status)}
        </div>
    );
    
    const Priority = () => (
      this.state.isEditTask ?
        <div onClick={this.onClickPriority}>
          <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.priority.value + "-icon"} />
          {this.getTaskPriority(this.state.priority.value)}
          <FontAwesomeIcon icon={faChevronDown}
              className="fa-xs gray-icon display-inline-block" />
        </div> :
        <div onClick={this.onClickPriority}>
          <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.taskDetail.priority + "-icon"} />
          {this.getTaskPriority(this.state.taskDetail.priority)}
        </div>
    );

    const Assigned = () => (
      this.state.isEditTask ?
        <div className="assigned-user" onClick={this.onClickAssignTo}>
          <span>{this.state.assigned.fullName}</span>
          <FontAwesomeIcon icon={faChevronDown}
            className="fa-xs gray-icon display-inline-block" />
        </div> :
        <div className="assigned-user" onClick={this.onClickAssignTo}>
          <span>{this.state.taskDetail.assigned_user_name}</span>
        </div>
    );

    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal} 
        size="lg" 
        aria-labelledby="example-modal-sizes-title-lg"
        className="task-detail-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <div className="row">
              <div className="box-header-option col-8">
                <div className={this.state.headerOption === 'detail' ? "header-option active" : "header-option inactive"}
                  onClick={() => {
                    this.setState({
                      headerOption: 'detail'
                    })
                  }}>
                  Detail
                </div>
                <div className={this.state.headerOption === 'comment' ? "header-option active" : "header-option inactive"}
                  onClick={() => {
                    this.setState({
                      headerOption: 'comment'
                    })
                  }}>
                  Comment
                </div>
                <div className={this.state.headerOption === 'history' ? "header-option active" : "header-option inactive"}
                  onClick={() => {
                    this.setState({
                      headerOption: 'history'
                    })
                  }}>
                  Task history
                </div>
              </div>
              <div className="box-header-option col-4">
                <div className="header-option">
                  Action
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row task-detail">
            <div className="col-8 left-side">
              <div className={this.state.headerOption === 'detail' ? "display-block detail" : "display-none detail"}>
                <div className="task-title">
                  {
                    this.state.isEditTask ?
                      <input type="text"
                        className="form-control visible-input text-dark-gray" 
                        value={this.state.title.value}
                        onChange={this.onChangeTitle}
                      /> :
                      <div>
                        <span>{this.state.taskDetail.title}</span>
                        <span className="float-right edit-task-icon"
                          onClick={() => {
                            this.setState({
                              isEditTask: true
                            })
                          }}>
                          <FontAwesomeIcon icon={faPencilAlt} className="fa-xs gray-icon" />
                        </span>
                      </div>
                  }
                  <span className="error-input-validate">{this.state.title.error}</span>
                </div>

                <div className="row">
                  <div className="col-12 custom-label assigned">
                    <img src={defaultAvatar} alt="Avatar" className="avatar" />
                    <div className="wid-100per">
                      <h5>
                        Assigned to
                        <span></span>
                      </h5>
                      <Assigned />
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-6 custom-label status">
                    <h5>
                      Status
                      <span></span>
                    </h5>
                    <Status />
                  </div>

                  <div className="col-xs-12 col-sm-6 custom-label priority">
                    <h5>
                      Priority
                      <span></span>
                    </h5>
                    <Priority />
                  </div>

                  <div className="col-12 custom-label description">
                    <h5>
                      Description
                      <span></span>
                    </h5>
                    <div>
                      {
                        this.state.isEditTask ?
                          <textarea type="text"
                            className="form-control visible-input"
                            rows={5}
                            value={this.state.description.value}
                            onChange={this.onChangeDescription}
                          /> :
                          <span>{this.state.taskDetail.description}</span>
                      }
                    </div>
                    <span className="error-input-validate">{this.state.description.error}</span>
                  </div>

                  <div className="col-xs-12 col-sm-6 custom-label start-date">
                    <h5>
                      Start Date
                      <span></span>
                    </h5>
                    <div>
                      {
                        this.state.isEditTask ?
                          <input type="date" className="form-control"
                            value={this.state.startDate.value}
                            onChange={this.onChangeStartDate}
                          /> :
                          <span>
                            {this.state.taskDetail.start_date}
                          </span>
                      }
                    </div>
                      <span className="error-input-validate">{this.state.startDate.error}</span>
                  </div>

                  <div className="col-xs-12 col-sm-6 custom-label due-date">
                    <h5>
                      Due Date
                      <span></span>
                    </h5>
                    <div>
                      {
                        this.state.isEditTask ?
                          <input type="date" className="form-control"
                            value={this.state.dueDate.value}
                            onChange={this.onChangeDueDate}
                          /> :
                          <span>
                            {this.state.taskDetail.due_date}
                          </span>
                      }
                    </div>
                    <span className="error-input-validate">{this.state.dueDate.error}</span>
                  </div>

                  <div className="col-12 custom-label percentage-completed">
                    <h5>
                      {"Percentage completed - " + this.state.percentageCompleted.value + "%"}
                      <span></span>
                    </h5>
                    <div>
                      {
                        this.state.isEditTask ?
                          <div>
                            <div class="form-group">
                              <input type="range" min="0" max="100"
                                class="form-control-range"
                                value={this.state.percentageCompleted.value}
                                onChange={this.onChangePercentageCompleted} />
                            </div>
                          </div> :
                          <ProgressBar
                            variant={this.state.taskDetail.percentage_completed < 20 ?
                              "danger" : 
                              this.state.taskDetail.percentage_completed >= 20
                              && this.state.taskDetail.percentage_completed < 60 ?
                              "warning" : "info"}
                            now={this.state.taskDetail.percentage_completed}
                            label={this.state.taskDetail.percentage_completed + '%'} />
                      }
                    </div>
                  </div>

                  <div className="col-12">
                    <span className="error-input-validate">{this.state.errorTaskServer}</span>
                  </div>

                  <div className="col-12 created-at">
                    <div>
                      <span>Created on: </span>
                      <span>{this.state.taskDetail.created_at}</span>
                      <span> by {this.state.taskDetail.created_user_name}</span>
                    </div>
                  </div>

                  <div className={this.state.isEditTask ? "col-12 display-block" : "col-12 display-none"}>
                    <button type="button" 
                      class="submit-btn-modal float-right btn btn-primary"
                      onClick={this.onClickSaveButton}>Save</button>
                    <button type="button"
                      class="close-btn-modal float-right btn btn-secondary"
                      onClick={() => {
                        this.setState({
                          isEditTask: false
                        })
                      }}>Cancel</button>
                  </div>
                </div>
              </div>
              <div className={this.state.headerOption === 'comment' ? "display-block comment" : "display-none comment"}>
                Comment
              </div>
              <div className={this.state.headerOption === 'history' ? "display-block history" : "display-none history"}>
                {
                  this.state.taskHistories.map((history, index) => (
                    <div key={index}>
                      {history.updated_by}
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-4 right-side">
              Comment
            </div>
          </div>

          <SelectTaskAssignedModal showModal={this.state.showAssignTaskModal}
            closeModal={this.closeAssignTaskModal}
            workspaceId={this.props.workspaceId}
            assignedId={this.state.assigned.value}
            getAssigned={this.getNewAssigned}
          />
          <SelectTaskStatusModal showModal={this.state.showSelectTaskStatusModal}
            closeModal={this.closeSelectTaskStatusModal}
            status={this.state.status.value}
            getStatus={this.getNewStatus}
          />
          <SelectTaskPriorityModal showModal={this.state.showSelectTaskPriorityModal}
            closeModal={this.closeSelectTaskPriorityModal}
            priority={this.state.priority.value}
            getPriority={this.getNewPriority}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default TaskDetailModal;
