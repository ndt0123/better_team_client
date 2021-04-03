import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFilter, faFolder, faPlus, faEllipsisV, faSleigh } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Pagination from "react-js-pagination";

import {
  HOST,
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

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.closeSettingWorkspace = this.closeSettingWorkspace.bind(this);
    this.closeAddMemberModal = this.closeAddMemberModal.bind(this);
    this.closeTaskDetailModal = this.closeTaskDetailModal.bind(this);
    this.openTaskDetailModal = this.openTaskDetailModal.bind(this);
    this.getListTaskByStatus = this.getListTaskByStatus.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.state = {
      isFocusSearchInput: false,
      showSettingWorkspace: false,
      showAddMemberModal: false,
      showNewTaskModal: false,
      showTaskDetailModal: {isShow: false, id: 0},
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
      }
    }
  }

  componentDidMount() {
    this.getListTaskByStatus(PENDING_STATUS_VALUE, 1);
    this.getListTaskByStatus(IN_PROGRESS_STATUS_VALUE, 1);
    this.getListTaskByStatus(FINISHED_STATUS_VALUE, 1);
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

  render() {
    return(
      <div className="row main-body">
        <div className="col-12 pad-b-15p">
          <div className="row pad-lr-15p header-btn">
            <div className="new-task-btn mar-r-15p"
              onClick={() => {
                console.log(this.state)
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
            <div className="ml-auto row right-option">
              <div className="btn">
                <FontAwesomeIcon icon={faFolder} className="fa-x1" />
                <span className="pad-l-5p">Description</span>
              </div>
              <div className="btn">
                <FontAwesomeIcon icon={faCommentDots} className="fa-x1" />
                <span className="pad-l-5p">Message</span>
              </div>
              <div className="btn mar-r-15p">
                <div className="dropdown">
                  <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray dropdown-toggle"   id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item"
                      onClick={() => {
                        this.setState({
                          showAddMemberModal: true
                        })
                      }}
                    >Add new members</span>
                    <span className="dropdown-item"
                      onClick={() => {
                        this.setState({
                          showSettingWorkspace: true
                        })
                      }}
                    >Setting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-md-12 col-lg-4 pad-b-15p">
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
                    updateListTask={this.getListTaskByStatus}/>
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

            <div className="col-md-12 col-lg-4 pad-b-15p">
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
                    updateListTask={this.getListTaskByStatus}/>
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

            <div className="col-md-12 col-lg-4 pad-b-15p">
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
                    updateListTask={this.getListTaskByStatus}/>
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
        </div>

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
        />
      </div>
    );
  }
}

export default Workspace;
