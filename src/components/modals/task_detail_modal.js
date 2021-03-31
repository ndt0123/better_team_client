import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";

import SelectTaskAssignedModal from './select_task_assigned_modal';
import SelectTaskStatusModal from '../modals/select_task_status_modal';
import SelectTaskPriorityModal from '../modals/select_task_priority_modal';

import * as myConstant from "../../constant.js";
import defaultAvatar from '../../images/default-avatar.jpg';

class TaskDetailModal extends Component {
  constructor(props) {
    super(props);
    this.getTaskDetail = this.getTaskDetail.bind(this);
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
    this.state = {
      showAssignTaskModal: false,
      showSelectTaskStatusModal: false,
      showSelectTaskPriorityModal: false,
      headerOption: 'detail',
      taskDetail: {},
      isEditTask: false,
      title: {value: '', error: '', canSubmit: true},
      description: {value: '', error: '', canSubmit: true},
      assigned: {value: '', error: '', canSubmit: true},
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
    }
  }

  getTaskDetail() {
    let taskId = this.props.id
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/task/' + taskId + '/detail',
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
          assigned: {value: response.data.task_detail.assigned_user_id, error: '', canSubmit: true},
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

  onClickSaveButton() {
    console.log(this.state);
  }

  onChangeStartDate = (e) => {
    this.setState({
      startDate: {
        value: e.target.value,
        error: '',
        canSubmit: true
      }
    })
  }

  onChangeDueDate = (e) => {
    this.setState({
      dueDate: {
        value: e.target.value,
        error: '',
        canSubmit: true
      }
    })
  }

  onChangeTitle = (e) => {
    this.setState({
      title: {
        value: e.target.value,
        error: '',
        canSubmit: true
      }
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      description: {
        value: e.target.value,
        error: '',
        canSubmit: true
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
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'finished':
        return 'Finished';
      default:
        return 'Deleted';
    }
  }

  getTaskPriority(priority) {
    switch(priority) {
      case 'low':
        return 'Low';
      case 'normal':
        return 'Normal';
      case 'high':
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
          <span>{this.state.taskDetail.assigned_user_name}</span>
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

                  <div className="col-12 custom-label label">
                    <h5>
                      Label
                      <span></span>
                    </h5>
                    <div>
                      {this.state.taskDetail.label}
                    </div>
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
                Task history
              </div>
            </div>
            <div className="col-4 right-side">
              Comment
            </div>
          </div>

          <SelectTaskAssignedModal showModal={this.state.showAssignTaskModal}
            closeModal={this.closeAssignTaskModal}
            workspaceId={this.props.workspaceId}
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
