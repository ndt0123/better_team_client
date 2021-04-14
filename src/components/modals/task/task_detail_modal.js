import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faBalanceScaleRight, faChevronDown, faCircle, faMapMarkedAlt, faPaperPlane, faPencilAlt, faStream, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';
import TextareaAutosize from 'react-autosize-textarea';

import SelectTaskAssignedModal from './select_task_assigned_modal';
import SelectTaskStatusModal from './select_task_status_modal';
import SelectTaskPriorityModal from './select_task_priority_modal';
import ConfirmDeteleTaskModal from './confirm_delete_task_modal';
import ConfirmFinishedModal from './confirm_finished_modal';

import {
  HOST,
  WEB_SOCKET_HOST,
  PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE,
  LOW_PRIORITY_VALUE,
  NORMAL_PRIORITY_VALUE,
  HIGH_PRIORITY_VALUE
} from "../../../constant.js";

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
    this.updateTask = this.updateTask.bind(this);
    this.closeConfirmDeteleTaskModal = this.closeConfirmDeteleTaskModal.bind(this);
    this.closeConfirmFinishedModal = this.closeConfirmFinishedModal.bind(this);
    this.onClickSendComment = this.onClickSendComment.bind(this);
    this.connectwebsocket = this.connectwebsocket.bind(this);
    this.state = {
      showAssignTaskModal: {
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
      showConfirmDeteleTaskModal: {
        isShow: false,
        directAction: false
      },
      showConfirmFinishedModal: {
        isShow: false,
        directAction: false
      },
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
      percentageCompleted: {value: 0, error: '', canSubmit: true},
      comments: [],
      commentContent: ''
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getTaskDetail();
      this.getTaskHistories();
      this.getTaskComments();
      this.connectwebsocket();
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

  getTaskComments() {
    let taskId = this.props.id
    axios({
      method: 'get',
      url: HOST + 'api/v1/task/' + taskId + '/comments',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          comments: response.data.comments
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  connectwebsocket() {
    this.sub = this.props.cable.subscriptions.create({
      channel: 'CommentChannel',
      task_id: this.props.id
    }, {
      received: (data) => {
        this.setState({
          comments: data.data
        })
      }
    });
  }

  updateTask(data) {
    let taskId = this.props.id
    axios({
      method: 'post',
      url: HOST + 'api/v1/task/' + taskId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: data
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
        this.getTaskHistories();
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
      let data = {
        title: this.state.title.value,
        description: this.state.description.value,
        assigned_user_id: this.state.assigned.value,
        priority: this.state.priority.value,
        status: this.state.status.value,
        due_date: this.state.dueDate.value,
        start_date: this.state.startDate.value,
        percentage_completed: this.state.percentageCompleted.value
      }
      this.updateTask(data);
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

  onChangeCommentInput = (e) => {
    this.setState({
      commentContent: e.target.value
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
        showAssignTaskModal: {
          isShow: true,
          directAction: false
        }
      })
    }
  }

  closeAssignTaskModal() {
    this.setState({
      showAssignTaskModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  onClickStatus() {
    if (this.state.isEditTask) {
      this.setState({
        showSelectTaskStatusModal: {
          isShow: true,
          directAction: false
        }
      })
    }
  }

  closeSelectTaskStatusModal() {
    this.setState({
      showSelectTaskStatusModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  onClickPriority() {
    if (this.state.isEditTask) {
      this.setState({
        showSelectTaskPriorityModal: {
          isShow: true,
          directAction: false
        }
      })
    }
  }

  closeSelectTaskPriorityModal() {
    this.setState({
      showSelectTaskPriorityModal: {
        isShow: false,
        directAction: false
      }
    })
  }

  closeConfirmDeteleTaskModal() {
    this.setState({
      showConfirmDeteleTaskModal: {
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

  onClickSendComment() {
    let taskId = this.props.id
    if (this.state.commentContent.trim() !== '') {
      axios({
        method: 'post',
        url: HOST + 'api/v1/task/' + taskId + '/comment',
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          content: this.state.commentContent
        }
      }).then((response) => {
        this.setState({
          commentContent: ''
        })
      }).catch((error) => {
        console.log(error);
      })
    }
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
        dialogClassName="custom-modal task-detail-modal"
        bsClass="my-modal"
        scrollable={true}
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
                    <img src={"/default-avatar.jpg"} alt="Avatar" className="avatar" />
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
                          <TextareaAutosize
                            className="form-control visible-input"
                            rows={3}
                            value={this.state.description.value}
                            onChange={this.onChangeDescription}
                          /> :
                          <span className="desc">{this.state.taskDetail.description}</span>
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
                            <div className="form-group">
                              <input type="range" min="0" max="100"
                                className="form-control-range"
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
                      className="submit-btn-modal float-right btn btn-primary"
                      onClick={this.onClickSaveButton}>Save</button>
                    <button type="button"
                      className="close-btn-modal float-right btn btn-secondary"
                      onClick={() => {
                        this.setState({
                          isEditTask: false
                        })
                      }}>Cancel</button>
                  </div>
                </div>
              </div>

              <div className={this.state.headerOption === 'comment' ? "display-block comment" : "display-none comment"}>
                <div className="comments">
                  {
                    this.state.comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <div className="avatar">
                          <img src={"/default-avatar.jpg"} alt="Avatar" />
                        </div>
                        <div className="comment-info">
                          <div className="name-time">
                            <span className="name">{comment.user_name} </span>
                            <span className="time">{comment.time}</span>
                          </div>
                          <div className="content">
                            <p>{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="input-comment">
                  <TextareaAutosize className="form-control custom-input"
                    placeholder="Type something to comment"
                    value={this.state.commentContent}
                    rows={2}
                    onChange={this.onChangeCommentInput}/>
                  <div className="submit-btn">
                    <FontAwesomeIcon icon={faPaperPlane}
                      className="fa-1x"
                      onClick={this.onClickSendComment}/>
                  </div>
                </div>
              </div>

              <div className={this.state.headerOption === 'history' ? "display-block history" : "display-none history"}>
                {
                  this.state.taskHistories.map((history, index) => (
                    <div key={index} className="history-item">
                      <div className="title-updated">
                        <FontAwesomeIcon icon={faCircle} className="fa-xs" />
                        <span>Updated by </span>
                        <span className="updated-by">{history.updated_by} </span>
                        <span className="updated-at">{history.updated_at} ago</span>
                      </div>
                      <div className="histories">
                        {
                          history.histories.map((his, index) => (
                            <div key={index}>
                              <FontAwesomeIcon icon={faCircle} className="fa-xs" />
                              <span>{his.field} </span>
                              <span>change from </span>
                              <span className="value-before">{his.value_before} </span>
                              <span>to </span>
                              <span className="value-before">{his.value_after}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-4 right-side">
              <div className="action-item"
                onClick={() => {
                  this.setState({
                    showAssignTaskModal: {
                      isShow: true,
                      directAction: true
                    }
                  })
                }}>
                <FontAwesomeIcon icon={faUser} className="fa-xs" />
                <span>Assign to</span>
              </div>
              <div className="action-item"
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
              <div className="action-item"
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
              <hr />
              {
                this.state.taskDetail.status !== 'finished' ?
                  <div className="action-item warning"
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
              <div className="action-item warning"
                onClick={() => {
                  this.setState({
                    showConfirmDeteleTaskModal: {
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

          <SelectTaskAssignedModal showModal={this.state.showAssignTaskModal.isShow}
            closeModal={this.closeAssignTaskModal}
            workspaceId={this.props.workspaceId}
            assignedId={this.state.assigned.value}
            getAssigned={this.getNewAssigned}
            directAction={this.state.showAssignTaskModal.directAction}
            updateTask={this.updateTask}
          />
          <SelectTaskStatusModal showModal={this.state.showSelectTaskStatusModal.isShow}
            closeModal={this.closeSelectTaskStatusModal}
            status={this.state.status.value}
            getStatus={this.getNewStatus}
            directAction={this.state.showSelectTaskStatusModal.directAction}
            updateTask={this.updateTask}
          />
          <SelectTaskPriorityModal showModal={this.state.showSelectTaskPriorityModal.isShow}
            closeModal={this.closeSelectTaskPriorityModal}
            priority={this.state.priority.value}
            getPriority={this.getNewPriority}
            directAction={this.state.showSelectTaskPriorityModal.directAction}
            updateTask={this.updateTask}
          />
          <ConfirmDeteleTaskModal showModal={this.state.showConfirmDeteleTaskModal.isShow}
            closeModal={this.closeConfirmDeteleTaskModal}
            closeTaskDetailModal={this.props.closeModal}
            directAction={this.state.showConfirmDeteleTaskModal.directAction}
            updateTask={this.updateTask}
          />
          <ConfirmFinishedModal showModal={this.state.showConfirmFinishedModal.isShow}
            closeModal={this.closeConfirmFinishedModal}
            directAction={this.state.showConfirmFinishedModal.directAction}
            updateTask={this.updateTask}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default TaskDetailModal;
