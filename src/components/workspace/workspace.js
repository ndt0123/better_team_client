import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFilter, faFolder, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import * as myConstant from '../../constant';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import TaskList from './task-list';
import WorkspaceSettingModal from '../modals/workspace_setting_modal';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.closeSettingWorkspace = this.closeSettingWorkspace.bind(this);
    this.getWorkspaceInfo = this.getWorkspaceInfo.bind(this);
    this.updateWorkspaceInfo = this.updateWorkspaceInfo.bind(this);
    this.state = {
      isFocusSearchInput: false,
      showSettingWorkspace: false,
      workspaceInfo: {}
    }
  }

  componentDidMount() {
    this.getWorkspaceInfo();
  }

  getWorkspaceInfo() {
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/workspace/' + this.props.match.params.id,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {}
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          workspaceInfo: response.data.workspace
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  updateWorkspaceInfo(workspaceInfo) {
    this.setState({
      workspaceInfo: workspaceInfo
    })
  }

  closeSettingWorkspace = () => {
    this.setState({
      showSettingWorkspace: false
    })
  }

  render() {
    return(
      <div className="row main-body">
        <div className="col-12 pad-b-15p">
          <div className="row pad-lr-15p header-btn">
              <div className="new-task-btn mar-r-15p">
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
              <div className="btn float-right">
                <FontAwesomeIcon icon={faFolder} className="fa-x1" />
                <span className="pad-l-5p">Description</span>
              </div>
              <div className="btn float-right">
                <FontAwesomeIcon icon={faCommentDots} className="fa-x1" />
                <span className="pad-l-5p">Message</span>
              </div>
              <div className="float-right btn">
                <div className="dropdown">
                  <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray dropdown-toggle"   id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item">Add new members</span>
                    <span className="dropdown-item"
                      onClick={() => {
                        this.setState({
                          showSettingWorkspace: true
                        })
                      }}>Setting</span>
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
          workspaceInfo={this.state.workspaceInfo}
          updateWorkspaceInfo={this.updateWorkspaceInfo}
        />
      </div>
    );
  }
}

export default Workspace;
