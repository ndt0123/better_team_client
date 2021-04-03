import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faChartLine, faCircle, faComments, faEdit, faFileAlt, faListUl, faPlus, faTrashAlt, faSignInAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import '../../styles/dashboard.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import TaskEdittingModal from '../modals/task/task_editting_modal';
import TaskCommentModal from '../modals/task/task_comment_modal';
import ConfirmDeleteTaskModal from '../modals/task/confirm_delete_task_modal';
import NewWorkspaceModal from '../modals/workspace/new_workspace_modal';
import WorkspaceDetailModal from '../modals/workspace/workspace_detail_modal';
import JoinWorkspaceConfirmModal from '../modals/workspace/join_workspace_confirm_modal';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalTaskEditting: false,
      showModalTaskComment: false,
      showModalDeleteTask: false,
      showNewWorkspaceModal: false,
      showWokspaceDetailModal: false,
      showJoinWorkspaceConfirmModal: false
    }
  }

  render() {
    return(
      <div className="main-body">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div">
              <div className="container-fluid">
                <div className="header-task row align-items-center">
                  <div className="col-8">
                    <h4 className="total-tasks-value f-w-600">4000</h4>
                    <h6 className="text-gray">Total tasks</h6>
                  </div>
                  <div className="col-4 text-right">
                    <FontAwesomeIcon icon={faListUl} className="fa-2x" />
                  </div>
                </div>
                <div className="footer-task total-tasks-footer bor-radius-0p-0p-0p-5p row align-items-center">
                  <div className="col-8">
                    <span className="text-white text-bold">% change</span>
                  </div>
                  <div className="col-4 text-right text-white">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div">
              <div className="container-fluid">
                <div className="header-task row align-items-center">
                  <div className="col-8">
                    <h4 className="new-tasks-value f-w-600">4000</h4>
                    <h6 className="text-gray">New Tasks</h6>
                  </div>
                  <div className="col-4 text-right">
                    <FontAwesomeIcon icon={faFileAlt} className="fa-2x" />
                  </div>
                </div>
                <div className="footer-task new-tasks-footer bor-radius-0p-0p-0p-5p row align-items-center">
                  <div className="col-8">
                    <span className="text-white text-bold">% change</span>
                  </div>
                  <div className="col-4 text-right text-white">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div">
              <div className="container-fluid">
                <div className="header-task row align-items-center">
                  <div className="col-8">
                    <h4 className="inprogress-tasks-value f-w-600">4000</h4>
                    <h6 className="text-gray">In Progress Tasks</h6>
                  </div>
                  <div className="col-4 text-right">
                    <FontAwesomeIcon icon={faEdit} className="fa-2x" />
                  </div>
                </div>
                <div className="footer-task inprogress-tasks-footer bor-radius-0p-0p-0p-5p row align-items-center">
                  <div className="col-8">
                    <span className="text-white text-bold">% change</span>
                  </div>
                  <div className="col-4 text-right text-white">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div">
              <div className="container-fluid">
                <div className="header-task row align-items-center">
                  <div className="col-8">
                    <h4 className="completed-tasks-value f-w-600">4000</h4>
                    <h6 className="text-gray">Task Completed</h6>
                  </div>
                  <div className="col-4 text-right">
                    <FontAwesomeIcon icon={faCalendarCheck} className="fa-2x" />
                  </div>
                </div>
                <div className="footer-task completed-tasks-footer bor-radius-0p-0p-0p-5p row align-items-center">
                  <div className="col-8">
                    <span className="text-white text-bold">% change</span>
                  </div>
                  <div className="col-4 text-right text-white">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-8 pad-t-15p pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div pad-b-15p pad-t-15p">
              <div className="box-dash-title-container row pad-b-10p">
                <div className="col-6">
                  <h5>Your Recent Tasks</h5>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="">
              <table className="table table-hover table-borderless">
                <thead>
                  <tr>
                    <th scope="col" className="pad-l-15p">Title</th>
                    <th scope="col">Workspace</th>
                    <th scope="col">Status</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Due date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pad-l-15p">Task number 1</td>
                    <td className="text-gray">Your own workspace</td>
                    <td className="text-gray">Inprogress</td>
                    <td className="text-gray">50%</td>
                    <td className="text-gray">23/01/2022</td>
                    <td className="text-gray action">
                      <div>
                        <FontAwesomeIcon data-tip data-for="editTaskTip" className="pad-l-3p mar-r-3p mar-l-3p" icon={faEdit} onClick={() => {
                          this.setState({
                            showModalTaskEditting: true
                          })
                        }}/>
                        <FontAwesomeIcon data-tip data-for="commentTaskTip" className="pad-l-3p mar-r-3p mar-l-3p" icon={faComments}onClick={() => {
                          this.setState({
                            showModalTaskComment: true
                          })
                        }}/>
                        <FontAwesomeIcon data-tip data-for="deleteTaskTip" className="pad-l-3p mar-r-3p mar-l-3p" icon={faTrashAlt} onClick={() => {
                          this.setState({
                            showModalDeleteTask: true
                          })
                        }}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 pad-t-15p pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div pad-b-15p pad-t-15p">
              <div className="box-dash-title-container row pad-b-10p">
                <div className="col-6">
                  <h5>Recent Messages</h5>
                </div>
                <div className="col-6"></div>
              </div>
              <div className="">
                <div className="col-12 mar-0p pad-t-10p pad-b-10p hover-gray-back row align-items-center">
                  <div className="col-10 pad-0p">
                    <div className="col-12 pad-l-0p pad-r-0p">Message 1</div>
                    <div className="col-12 pad-l-0p pad-r-0p text-small text-gray">
                      Nguyen Duy Tam: Content message 1
                    </div>
                  </div>
                  <div className="col-2 pad-0p">
                    <FontAwesomeIcon icon={faCircle} className="fa-xs fa-pull-right text-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-4 pad-t-15p pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div pad-b-15p pad-t-15p">
              <div className="box-dash-title-container row pad-b-10p">
                <div className="col-6">
                  <h5>Your Workspace</h5>
                </div>
                <div className="col-6">
                  <FontAwesomeIcon data-tip data-for="createWorkspaceTip" className="fa-pull-right mar-l-15p mar-r-15p hover-cursor-pointer text-green" icon={faPlus} onClick={() => {
                    this.setState({
                      showNewWorkspaceModal: true
                    })
                  }} />
                </div>
              </div>
              <div className="">
                <div className="col-12 mar-0p pad-t-10p pad-b-10p hover-gray-back row align-items-center">
                  <div className="col-10 pad-0p">
                    <div className="col-12 pad-l-0p pad-r-0p">Workspace 1</div>
                    <div className="col-12 pad-l-0p pad-r-0p text-small text-gray">
                        Description workspace 1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-8 pad-t-15p pad-b-15p">
            <div className="white-back-color bor-radius-5p shadow-box-div pad-b-15p pad-t-15p">
              <div className="box-dash-title-container row pad-b-10p">
                <div className="col-6 col-sm-8">
                  <h5>All Workspace</h5>
                </div>
                <div className="col-6 col-sm-4 input-group">
                  <input type="text" className="form-control pad-t-0p pad-b-0p mar-r-15p custom-input" placeholder="Search workspace"  aria-describedby="basic-addon2"/>
                </div>
              </div>
              <div className="">
              <table className="table table-hover table-borderless">
                <thead>
                  <tr>
                    <th scope="col" className="pad-l-15p">Workspace</th>
                    <th scope="col">Description</th>
                    <th scope="col">Members</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pad-l-15p">Workspace number 1</td>
                    <td className="text-gray">Description Description number 1 number 1</td>
                    <td className="text-gray">10 members</td>
                    <td className="text-gray action">
                      <div>
                        <FontAwesomeIcon data-tip data-for="joinWorkspaceTip" className="text-green hover-cursor-pointer mar-l-3p mar-r-3p" icon={faSignInAlt} onClick={() => {
                          this.setState({
                            showJoinWorkspaceConfirmModal: true
                          })
                        }}/>
                        <FontAwesomeIcon data-tip data-for="detailWorkspaceTip" className="text-yellow hover-cursor-pointer mar-l-3p mar-r-3p" icon={faEye} onClick={() => {
                          this.setState({
                            showWokspaceDetailModal: true
                          })
                        }}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>


        <ReactTooltip id="detailWorkspaceTip" place="bottom" effect="solid">
          Show detail
        </ReactTooltip>
        <ReactTooltip id="joinWorkspaceTip" place="bottom" effect="solid">
          Join workspace
        </ReactTooltip>
        <ReactTooltip id="createWorkspaceTip" place="bottom" effect="solid">
          Create workspace
        </ReactTooltip>
        <ReactTooltip id="editTaskTip" place="bottom" effect="solid">
          Edit
        </ReactTooltip>
        <ReactTooltip id="commentTaskTip" place="bottom" effect="solid">
          Comment
        </ReactTooltip>
        <ReactTooltip id="deleteTaskTip" place="bottom" effect="solid">
          Delete
        </ReactTooltip>

        <TaskEdittingModal showModal={this.state.showModalTaskEditting} closeModal={() => {
          this.setState({
            showModalTaskEditting: false
          })
        }}/>
        <TaskCommentModal showModal={this.state.showModalTaskComment} closeModal={() => {
          this.setState({
            showModalTaskComment: false
          })
        }}/>
        <ConfirmDeleteTaskModal showModal={this.state.showModalDeleteTask} closeModal={() => {
          this.setState({
            showModalDeleteTask: false
          })
        }}/>
        <NewWorkspaceModal showModal={this.state.showNewWorkspaceModal} closeModal={() => {
          this.setState({
            showNewWorkspaceModal: false
          })
        }}/>
        <WorkspaceDetailModal showModal={this.state.showWokspaceDetailModal} closeModal={() => {
          this.setState({
            showWokspaceDetailModal: false
          })
        }}/>
        <JoinWorkspaceConfirmModal showModal={this.state.showJoinWorkspaceConfirmModal} closeModal={() => {
          this.setState({
            showJoinWorkspaceConfirmModal: false
          })
        }}/>
      </div>
    );
  }
}

export default Dashboard;
