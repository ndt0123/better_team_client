import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFilter, faFolder, faPlus, faEllipsisV, faSleigh } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import * as myConstant from '../../constant';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import TaskList from './task-list';
import WorkspaceSettingModal from '../modals/workspace_setting_modal';
import AddMemberModal from '../modals/add_member_modal';
import NewTaskModal from '../modals/new_task_modal';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.closeSettingWorkspace = this.closeSettingWorkspace.bind(this);
    this.closeAddMemberModal = this.closeAddMemberModal.bind(this);
    this.state = {
      isFocusSearchInput: false,
      showSettingWorkspace: false,
      showAddMemberModal: false,
      showNewTaskModal: false
    }
  }

  componentDidMount() {
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

  render() {
    return(
      <div className="row main-body">
        <div className="col-12 pad-b-15p">
          <div className="row pad-lr-15p header-btn">
            <div className="new-task-btn mar-r-15p"
              onClick={() => {
                this.setState({
                  showNewTaskModal: true
                })
              }}>
              <FontAwesomeIcon icon={faPlus} className="fa-xs" />
              <span className="pad-l-5p">New task</span>
            </div>
            <div className={this.state.isFocusSearchInput ? "search-input focus-input" : "search-input blur-input"}>
              <FontAwesomeIcon icon={faFilter} className="fa-xs" />
              <input type="text" placeholder="Type to filter task" className="mar-l-5p" 
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
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>

                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <TaskList />
              </div>
            </div>

            <div className="col-md-12 col-lg-4 pad-b-15p">
              <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                <div className="col-12 title">
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>

                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <TaskList />

                <TaskList />
              </div>
            </div>

            <div className="col-md-12 col-lg-4 pad-b-15p">
              <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                <div className="col-12 title">
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>
                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <TaskList />
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
        />
      </div>
    );
  }
}

export default Workspace;
