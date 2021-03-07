import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faFilter, faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

import TaskList from './task-list';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusSearchInput: false
    }
  }
  render() {
    return(
      <div className="row main-body">
        <div className="col-12 pad-b-15p">
          <div className="row pad-lr-15p header-btn">
            <div className="col-6 row">
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
            </div>
            <div className="col-6 row">
              <div className="btn float-right">
                <FontAwesomeIcon icon={faFolder} className="fa-x1" />
                <span className="pad-l-5p">Description</span>
              </div>
              <div className="btn float-right">
                <FontAwesomeIcon icon={faCommentDots} className="fa-x1" />
                <span className="pad-l-5p">Message</span>
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
      </div>
    );
  }
}

export default Workspace;
