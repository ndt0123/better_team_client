import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';

import * as myConstant from "../../constant.js";
import defaultAvatar from '../../images/default-avatar.jpg';
import { get } from 'jquery';

class TaskDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerOption: 'detail',
      taskDetail: {}
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
          taskDetail: response.data.task_detail
        })
      }
    }).catch((error) => {
      console.log(error);
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
              <div className="box-header-option col-7">
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
              <div className="box-header-option col-5">
                <div className="header-option">
                  Action
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row task-detail">
            <div className="col-7 left-side">
              <div className={this.state.headerOption === 'detail' ? "display-block detail" : "display-none detail"}>
                <div className="task-title">
                  {this.state.taskDetail.title}
                </div>
                <div className="row">
                  <div className="col-12 pad-b-15p custom-label assigned">
                    <img src={defaultAvatar} alt="Avatar" className="avatar" />
                    <div className="wid-100per">
                      <h5>
                        Assigned to
                        <span></span>
                      </h5>
                      <div className="assigned-user">
                        <span>{this.state.taskDetail.assigned_user_name}</span>
                        <FontAwesomeIcon icon={faChevronDown} className="fa-xs gray-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 pad-b-15p custom-label status">
                    <h5>
                      Status
                      <span></span>
                    </h5>
                    <div>
                      <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.taskDetail.status + "-icon"} />
                      {this.getTaskStatus(this.state.taskDetail.status)}
                      <FontAwesomeIcon icon={faChevronDown} className="fa-xs gray-icon" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 pad-b-15p custom-label priority">
                    <h5>
                      Priority
                      <span></span>
                    </h5>
                    <div>
                      <FontAwesomeIcon icon={faCircle} className={"fa-xs " + this.state.taskDetail.priority + "-icon"} />
                      {this.getTaskPriority(this.state.taskDetail.priority)}
                      <FontAwesomeIcon icon={faChevronDown} className="fa-xs gray-icon" />
                    </div>
                  </div>
                  <div className="col-12 pad-b-15p custom-label description">
                    <h5>
                      Description
                      <span></span>
                    </h5>
                    <div>
                      {this.state.taskDetail.description}
                    </div>
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
            <div className="col-5 right-side">
              Comment
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TaskDetailModal;
