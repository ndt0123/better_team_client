import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faEllipsisV, faUserPlus, faCogs, faTasks, faComments, faOutdent } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Pagination from "react-js-pagination";
import ActionCable from 'actioncable';

import {
  HOST,
  WEB_SOCKET_HOST,
  PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE,
  TASK_PER_PAGE
} from "../../constant.js";

import Task from './task';
import WorkspaceSettingModal from '../modals/workspace/workspace_setting_modal';
import AddMemberModal from '../modals/workspace/add_member_modal';
import NewTaskModal from '../modals/task/new_task_modal';
import TaskDetailModal from '../modals/task/task_detail_modal';
import ConfirmLeaveWorkspaceModal from '../modals/workspace/confirm_leave_workspace_modal';
import Messages from './messages';

const CABLE = ActionCable.createConsumer(WEB_SOCKET_HOST + 'cable');

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.closeSettingWorkspace = this.closeSettingWorkspace.bind(this);
    this.closeAddMemberModal = this.closeAddMemberModal.bind(this);
    this.closeTaskDetailModal = this.closeTaskDetailModal.bind(this);
    this.openTaskDetailModal = this.openTaskDetailModal.bind(this);
    this.getListTaskByStatus = this.getListTaskByStatus.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onClickSendMessage = this.onClickSendMessage.bind(this);
    this.connectwebsocket = this.connectwebsocket.bind(this);
    this.confirmLeaveWorkspace = this.confirmLeaveWorkspace.bind(this);
    this.onClickSendReplyMessage = this.onClickSendReplyMessage.bind(this);

    this.state = {
      isFocusSearchInput: false,
      isShowTaskList: true,
      showSettingWorkspace: false,
      showAddMemberModal: false,
      showNewTaskModal: false,
      showTaskDetailModal: {isShow: false, id: 0},
      showConfirmLeaveWorkspaceModal: false,
      defaultNewTaskStatus: PENDING_STATUS_VALUE,
      pendingListTask: [],
      inProgressListTask: [],
      finishedListTask: [],
      pageByStatus: {
        pending: 1,
        inProgress: 1,
        finished: 1
      },
      totalByStatus: {
        pending: 0,
        inProgress: 0,
        finished: 0
      },
      messages: []
    }
  }

  componentDidMount() {
    let workspaceId = this.props.match.params.id;

    this.getListTaskByStatus(PENDING_STATUS_VALUE, 1);
    this.getListTaskByStatus(IN_PROGRESS_STATUS_VALUE, 1);
    this.getListTaskByStatus(FINISHED_STATUS_VALUE, 1);
    this.getMessages(workspaceId);
    this.connectwebsocket(workspaceId);
  }

  getListTaskByStatus(status, page, searchText = '') {
    let workspaceId = this.props.match.params.id;
    axios({
      method: 'get',
      url: HOST + 'api/v1/workspace/' + workspaceId + '/' + status + '_tasks_list',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        page: page,
        search_text: searchText
      }
    }).then((response) => {
      if (response.data.is_success) {
        if (status === PENDING_STATUS_VALUE) {
          this.setState({
            pendingListTask: response.data.tasks_list,
            totalByStatus: {
              pending: response.data.total_task,
              inProgress: this.state.totalByStatus.inProgress,
              finished: this.state.totalByStatus.finished
            }
          })
        } else if (status === IN_PROGRESS_STATUS_VALUE) {
          this.setState({
            inProgressListTask: response.data.tasks_list,
            totalByStatus: {
              pending: this.state.totalByStatus.pending,
              inProgress: response.data.total_task,
              finished: this.state.totalByStatus.finished
            }
          })
        } else if (status === FINISHED_STATUS_VALUE) {
          this.setState({
            finishedListTask: response.data.tasks_list,
            totalByStatus: {
              pending: this.state.totalByStatus.pending,
              inProgress: this.state.totalByStatus.inProgress,
              finished: response.data.total_task
            }
          })
        }
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  connectwebsocket(workspaceId) {
    this.sub = CABLE.subscriptions.create({
      channel: 'MessageChannel',
      workspace_id: workspaceId
    }, {
      received: (data) => {
        console.log(data)
        this.setState({
          messages: data.data
        })
      }
    });
  }

  getMessages(workspaceId) {
    axios({
      method: 'get',
      url: HOST + 'api/v1/workspace/' + workspaceId + '/messages',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          messages: response.data.messages
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onClickSendMessage(messageContent) {
    let workspaceId = this.props.match.params.id;
    if (messageContent.trim() !== '') {
      axios({
        method: 'post',
        url: HOST + 'api/v1/workspace/' + workspaceId + '/message',
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          content: messageContent
        }
      }).then((response) => {
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  onClickSendReplyMessage(message_id, content) {
    let workspaceId = this.props.match.params.id;
    if (content.trim() !== '') {
      axios({
        method: 'post',
        url: HOST + 'api/v1/workspace/' + workspaceId + '/create_reply_message',
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          content: content,
          message_id: message_id
        }
      }).then((response) => {
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  onChangeSearchInput = (e) => {
    this.getListTaskByStatus(PENDING_STATUS_VALUE, 1, e.target.value);
    this.getListTaskByStatus(IN_PROGRESS_STATUS_VALUE, 1, e.target.value);
    this.getListTaskByStatus(FINISHED_STATUS_VALUE, 1, e.target.value);
  }

  closeSettingWorkspace = () => {
    this.setState({
      showSettingWorkspace: false
    })
  }

  closeAddMemberModal = () => {
    this.setState({
      showAddMemberModal: false
    })
  }

  closeNewTaskModal = () => {
    this.setState({
      showNewTaskModal: false
    })
  }

  closeTaskDetailModal = () => {
    this.setState({
      showTaskDetailModal: {
        isShow: false,
        id: this.state.showTaskDetailModal.id
      }
    })
  }

  closeConfirmLeaveWorkspaceModal = () => {
    this.setState({
      showConfirmLeaveWorkspaceModal: false
    })
  }

  openTaskDetailModal = (task_id) => {
    this.setState({
      showTaskDetailModal: {
        isShow: true,
        id: task_id
      }
    })
  }

  handlePageChangePending(pageNumber) {
    this.setState({
      pageByStatus: {
        pending: pageNumber,
        inProgress: this.state.pageByStatus.inProgress,
        finished: this.state.pageByStatus.finished
      }
    });
    this.getListTaskByStatus(PENDING_STATUS_VALUE, pageNumber);
  }

  handlePageChangeInPorgress(pageNumber) {
    this.setState({
      pageByStatus: {
        pending: this.state.pageByStatus.pending,
        inProgress: pageNumber,
        finished: this.state.pageByStatus.finished
      }
    });
    this.getListTaskByStatus(IN_PROGRESS_STATUS_VALUE, pageNumber);
  }

  handlePageChangeFinished(pageNumber) {
    this.setState({
      pageByStatus: {
        pending: this.state.pageByStatus.pending,
        inProgress: this.state.pageByStatus.inProgress,
        finished: pageNumber
      }
    });
    this.getListTaskByStatus(FINISHED_STATUS_VALUE, pageNumber);
  }

  confirmLeaveWorkspace() {
    let workspaceId = this.props.match.params.id;
    axios({
      method: 'post',
      url: HOST + 'api/v1/workspace/' + workspaceId + '/leave_workspace',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.props.history.push('/');
        this.props.updateListWorkspaces();
        this.setState({
          showConfirmLeaveWorkspaceModal: false
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className="main-body pad-t-0p">
        <div className="col-12 header">
          <div className={this.state.isShowTaskList ? "tasks option-btn active float-left": "tasks option-btn float-left"}
            onClick={() => {
              this.setState({
                isShowTaskList: true
              })
            }}>
            <FontAwesomeIcon icon={faTasks} className="fa-xs" />
            <span>Tasks</span>
          </div>

          <div className={this.state.isShowTaskList ? "message option-btn float-left": "message option-btn active float-left"}
            onClick={() => {
              this.setState({
                isShowTaskList: false
              })
            }}>
            <FontAwesomeIcon icon={faComments} className="fa-xs" />
            <span>Message</span>
          </div>

          <div className="btn mar-r-15p pad-0p box-menu-icon float-right">
            <div className="dropdown menu-icon">
              <div id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray"/>
              </div>
              <div className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton">

                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.setState({
                      showAddMemberModal: true
                    })
                  }}>
                  <FontAwesomeIcon icon={faUserPlus} className="fa-xs" />
                  <span>Add members</span>
                </div>

                <div className="action-item dropdown-item"
                  onClick={() => {
                    this.setState({
                      showSettingWorkspace: true
                    })
                  }}>
                  <FontAwesomeIcon icon={faCogs} className="fa-xs" />
                  <span>Setting</span>
                </div>

                <div className="action-item dropdown-item warning"
                  onClick={() => {
                    this.setState({
                      showConfirmLeaveWorkspaceModal: true
                    })
                  }}>
                  <FontAwesomeIcon icon={faOutdent} className="fa-xs" />
                  <span>Leave workspace</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          this.state.isShowTaskList ?
            <div className="col-12 pad-r-0p pad-t-15p list-tasks-box">
              <div className="col-12 header-btn row pad-r-0p">
                <div className="new-task-btn mar-r-15p"
                  onClick={() => {
                    this.setState({
                      showNewTaskModal: true,
                      defaultNewTaskStatus: PENDING_STATUS_VALUE
                    })
                  }}>
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">New task</span>
                </div>

                <div className={this.state.isFocusSearchInput ? "search-input focus-input" : "search-input blur-input"}>
                  <FontAwesomeIcon icon={faFilter} className="fa-xs" />
                  <input type="text" placeholder="Type to filter task by task's title" className="mar-l-5p" 
                    onFocus={() => {
                      this.setState({
                        isFocusSearchInput: true
                      })
                    }}
                    onBlur={() => {
                      this.setState({
                        isFocusSearchInput: false
                      })
                    }}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>

              <div className="col-12 row pad-r-0p">
                <div className="col-md-12 col-lg-4 list-tasks-item">
                  <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                    <div className="col-12 title">
                      <span>PENDING TASKS</span>
                      <span className="total-task">{this.state.totalByStatus.pending}</span>
                    </div>

                    <div className="col-12 add-task-btn"
                      onClick={() => {
                        this.setState({
                          showNewTaskModal: true,
                          defaultNewTaskStatus: PENDING_STATUS_VALUE
                        })
                      }}>
                      <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                      <span className="pad-l-5p">Add new task</span>
                    </div>

                    {this.state.pendingListTask.map((task, index) => (
                      <Task key={index} task={task}
                        openTaskDetailModal={this.openTaskDetailModal}
                        updateListTask={this.getListTaskByStatus}
                        workspaceId={this.props.match.params.id}/>
                    ))}
                    {
                      this.state.totalByStatus.pending > TASK_PER_PAGE ?
                        <div>
                          <Pagination
                            activePage={this.state.pageByStatus.pending}
                            itemsCountPerPage={TASK_PER_PAGE}
                            totalItemsCount={this.state.totalByStatus.pending}
                            pageRangeDisplayed={5}
                            prevPageText="prev"
                            nextPageText="next"
                            onChange={this.handlePageChangePending.bind(this)}
                          />
                        </div> : ""
                    }
                  </div>
                </div>

                <div className="col-md-12 col-lg-4 list-tasks-item">
                  <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                    <div className="col-12 title">
                      <span>IN PROGRESS TASKS</span>
                      <span className="total-task">{this.state.totalByStatus.inProgress}</span>
                    </div>

                    <div className="col-12 add-task-btn"
                      onClick={() => {
                        this.setState({
                          showNewTaskModal: true,
                          defaultNewTaskStatus: IN_PROGRESS_STATUS_VALUE
                        })
                      }}>
                      <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                      <span className="pad-l-5p">Add new task</span>
                    </div>

                    {this.state.inProgressListTask.map((task, index) => (
                      <Task key={index} task={task}
                        openTaskDetailModal={this.openTaskDetailModal}
                        updateListTask={this.getListTaskByStatus}
                        workspaceId={this.props.match.params.id}/>
                    ))}
                    {
                      this.state.totalByStatus.inProgress > TASK_PER_PAGE ?
                        <div>
                          <Pagination
                            activePage={this.state.pageByStatus.inProgress}
                            itemsCountPerPage={TASK_PER_PAGE}
                            totalItemsCount={this.state.totalByStatus.inProgress}
                            pageRangeDisplayed={5}
                            prevPageText="prev"
                            nextPageText="next"
                            onChange={this.handlePageChangeInPorgress.bind(this)}
                          />
                        </div> : ""
                    }
                  </div>
                </div>

                <div className="col-md-12 col-lg-4 list-tasks-item pad-r-0p">
                  <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                    <div className="col-12 title">
                      <span>FINISHED TASKS</span>
                      <span className="total-task">{this.state.totalByStatus.finished}</span>
                    </div>
                    <div className="col-12 add-task-btn"
                      onClick={() => {
                        this.setState({
                          showNewTaskModal: true,
                          defaultNewTaskStatus: FINISHED_STATUS_VALUE
                        })
                      }}>
                      <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                      <span className="pad-l-5p">Add new task</span>
                    </div>

                    {this.state.finishedListTask.map((task, index) => (
                      <Task className="dfer" key={index} task={task}
                        openTaskDetailModal={this.openTaskDetailModal}
                        updateListTask={this.getListTaskByStatus}
                        workspaceId={this.props.match.params.id}/>
                    ))}
                    {
                      this.state.totalByStatus.finished > TASK_PER_PAGE ?
                        <div>
                          <Pagination
                            activePage={this.state.pageByStatus.finished}
                            itemsCountPerPage={TASK_PER_PAGE}
                            totalItemsCount={this.state.totalByStatus.finished}
                            pageRangeDisplayed={5}
                            prevPageText="prev"
                            nextPageText="next"
                            onChange={this.handlePageChangeFinished.bind(this)}
                          />
                        </div> : ""
                    }
                  </div>
                </div>
              </div>
            </div> :

            <Messages messages={this.state.messages}
              onClickSendMessage={this.onClickSendMessage}
              onClickSendReplyMessage={this.onClickSendReplyMessage}/>
        }

        <WorkspaceSettingModal showModal={this.state.showSettingWorkspace}
          closeModal={this.closeSettingWorkspace}
          workspaceId={this.props.match.params.id}
        />
        <AddMemberModal showModal={this.state.showAddMemberModal}
          closeModal={this.closeAddMemberModal}
          workspaceId={this.props.match.params.id}
        />
        <NewTaskModal showModal={this.state.showNewTaskModal}
          closeModal={this.closeNewTaskModal}
          workspaceId={this.props.match.params.id}
          defaultNewTaskStatus={this.state.defaultNewTaskStatus}
          getListTaskByStatus={this.getListTaskByStatus}
        />
        <TaskDetailModal showModal={this.state.showTaskDetailModal.isShow}
          closeModal={this.closeTaskDetailModal}
          id={this.state.showTaskDetailModal.id}
          workspaceId={this.props.match.params.id}
          updateListTask={this.getListTaskByStatus}
          cable={CABLE}
        />
        <ConfirmLeaveWorkspaceModal showModal={this.state.showConfirmLeaveWorkspaceModal}
          closeModal={this.closeConfirmLeaveWorkspaceModal}
          confirmLeaveWorkspace={this.confirmLeaveWorkspace}
        />
      </div>
    );
  }
}

export default Workspace;
