import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

import {
  HOST,
  PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE,
  LOW_PRIORITY_VALUE,
  NORMAL_PRIORITY_VALUE,
  HIGH_PRIORITY_VALUE
} from "../../../constant.js";

class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.onClickSubmitBtn = this.onClickSubmitBtn.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssigned = this.onChangeAssigned.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.state = {
      allMembers: [],
      title: {value: '', error: '', canSubmit: false},
      description: {value: '', error: '', canSubmit: false},
      assigned: {value: '', error: '', canSubmit: false},
      priority: {value: LOW_PRIORITY_VALUE, error: '', canSubmit: false},
      status: {value: PENDING_STATUS_VALUE, error: '', canSubmit: false},
      dueDate: {value: '', error: '', canSubmit: false},
      errorValidateServer: ''
    }
  }

  componentDidMount() {
    this.getAllMembers();
  }

  componentWillReceiveProps(props) {
    if (props.defaultNewTaskStatus !== this.props.defaultNewTaskStatus) {
      this.setState({
        status: {
          value: props.defaultNewTaskStatus,
          error: ''
        }
      })
    }
  }

  getAllMembers() {
    let workspaceId = this.props.workspaceId;
    axios({
      method: 'get',
      url: HOST + 'api/v1/workspace/' + workspaceId + '/all_members',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        search_key: ''
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          allMembers: response.data.members
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  createNewTask() {
    let workspaceId = this.props.workspaceId;
    console.log(workspaceId)
    axios({
      method: 'post',
      url: HOST + 'api/v1/workspace/' + workspaceId + '/new_task',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        title: this.state.title.value.trim(),
        description: this.state.description.value.trim(),
        priority: this.state.priority.value,
        status: this.state.status.value,
        assigned_user_id: this.state.assigned.value,
        due_date: this.state.dueDate.value
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.props.getListTaskByStatus(this.state.status.value, 1)
        this.setState({
          title: {value: '', error: '', canSubmit: false},
          description: {value: '', error: '', canSubmit: false},
          assigned: {value: '', error: '', canSubmit: false},
          priority: {value: LOW_PRIORITY_VALUE, error: '', canSubmit: false},
          status: {value: PENDING_STATUS_VALUE, error: '', canSubmit: false},
          dueDate: {value: '', error: '', canSubmit: false},
          errorValidateServer: ''
        })
        this.props.closeModal();
      } else {
        this.setState({
          errorValidateServer: response.data.message
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onClickSubmitBtn() {
    if (this.state.title.canSubmit 
      && this.state.description.canSubmit
      && this.state.dueDate.canSubmit) {
      this.createNewTask();
    } else {
      if (this.state.title.value.trim() === '') {
        this.setState({
          title: {
            value: this.state.title.value,
            error: "Title can't be blank.",
            canSubmit: false
          }
        })
      }
      if (this.state.description.value.trim() === '') {
        this.setState({
          description: {
            value: this.state.description.value,
            error: "Description can't be blank.",
            canSubmit: false
          }
        })
      }
      if (this.state.dueDate.value === '') {
        this.setState({
          dueDate: {
            value: this.state.description.value,
            error: "Due date can't be blank.",
            canSubmit: false
          }
        })
      }
    }
  }

  onChangeTitle = (e) => {
    let error = '';
    let canSubmit = true;
    if (e.target.value.trim() === '') {
      error = "Title can't be blank."
      canSubmit = false
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

  onChangeAssigned = (e) => {
    this.setState({
      assigned: {
        value: e.target.value,
        error: ''
      }
    })
  }

  onChangePriority = (e) => {
    this.setState({
      priority: {
        value: e.target.value,
        error: ''
      }
    })
  }

  onChangeStatus = (e) => {
    this.setState({
      status: {
        value: e.target.value,
        error: ''
      }
    })
  }

  onChangeDueDate = (e) => {
    let error = '';
    let canSubmit = true;
    if (e.target.value === '') {
      error = 'Due date can not be blank.';
      canSubmit = false;
    } else if (new Date(e.target.value) < new Date()) {
      error = 'Due date can not less than today.';
      canSubmit = false;
    }
    this.setState({
      dueDate: {
        value: e.target.value,
        error: error,
        canSubmit: canSubmit
      }
    })
  }

  render() {
    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mar-t-15p">
            <label htmlFor="title" className="text-bold text-dark-gray">Task's title</label>
            <input type="text" className="form-control custom-input" id="title" placeholder="Enter task's title" 
              value={this.state.title.value}
              onChange={this.onChangeTitle}
            />
            <span className="error-input-validate">{this.state.title.error}</span>
          </div>
          <div className="form-group mar-t-15p">
            <label htmlFor="description" className="text-bold text-dark-gray">Task's description</label>
            <textarea type="text" className="form-control custom-input" id="description" placeholder="Enter task's description"
              rows={5}
              value={this.state.description.value}
              onChange={this.onChangeDescription}
            />
            <span className="error-input-validate">{this.state.description.error}</span>
          </div>
          <div className="form-group">
            <label for="assigned" className="text-bold text-dark-gray">Assigned to</label>
            <select className="form-control custom-input" id="assigned"
              value={this.state.assigned.value}
              onChange={this.onChangeAssigned}>
              <option value="">Me</option>
              {this.state.allMembers.map((member, index) => (
                <option key={index} value={member.id}>
                  {member.first_name + ' ' + member.last_name}
                </option>
              ))}
            </select>
          <span className="text-dark-gray text-size-15p">Pick someone to do this task</span>
          </div>
          <br/>
          <span className="text-dark-gray text-size-15p">Setting priority, status, and due date for other members can tracking progress of this task</span>
          <div className="form-row">
            <div className="form-group col-xs-12 col-sm-6">
              <label for="priority" className="text-bold text-dark-gray">Priority</label>
              <select className="form-control custom-input" id="priority"
                value={this.state.priority.value}
                onChange={this.onChangePriority}>
                <option value={LOW_PRIORITY_VALUE}>Low</option>
                <option value={NORMAL_PRIORITY_VALUE}>Normal</option>
                <option value={HIGH_PRIORITY_VALUE}>High</option>
              </select>
            </div>
            <div className="form-group col-xs-12 col-sm-6">
              <label for="status" className="text-bold text-dark-gray">Status</label>
              <select className="form-control custom-input" id="status"
                value={this.state.status.value}
                onChange={this.onChangeStatus}>
                <option value={PENDING_STATUS_VALUE}>Pending</option>
                <option value={IN_PROGRESS_STATUS_VALUE}>In progress</option>
                <option value={FINISHED_STATUS_VALUE}>Finished</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="dueDate" className="text-bold text-dark-gray">Due date</label>
            <input type="date" className="form-control custom-input" id="dueDate"
              value={this.state.dueDate.value}
              onChange={this.onChangeDueDate}
            />
          </div>
          <span className="error-input-validate">{this.state.dueDate.error}</span>
          <span className="error-input-validate">{this.state.errorValidateServer}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="close-btn-modal" onClick={this.props.closeModal}>
            Close
          </Button>
          <Button variant="primary" className="submit-btn-modal"
            onClick={this.onClickSubmitBtn}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewTaskModal;
