import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faEllipsisV, faFilter, faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import {ProgressBar} from 'react-bootstrap';

import '../../styles/workspace.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

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
            <div className="col-4 pad-b-15p">
              <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                <div className="col-12 title">
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>

                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <div className="col-12 list mar-t-15p">
                  <div className="row pad-b-15p">
                    <div className="float-left col-11">
                      <span>This is title of task 1 This is title of task 1</span>
                      <span className="completion at_risk">At risk</span>
                    </div>
                    <div className="float-right col-1 menu-icon">
                      <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray" />
                    </div>  
                  </div>
                  <div className="mar-b-15p">
                    <ProgressBar variant="warning" now={25} label={`25%`} />
                  </div>
                  <div>
                    <span className="assign">Nguyen Duy Tam</span>
                    <span className="priority high float-right">High</span>
                  </div>               
                </div>
              </div>
            </div>

            <div className="col-4 pad-b-15p">
              <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                <div className="col-12 title">
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>

                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <div className="col-12 list mar-t-15p">
                  <div className="row pad-b-15p">
                    <div className="float-left col-11">
                      <span>This is title of task 1 This is title of task 1</span>
                      <span className="completion on_track">On track</span>
                    </div>
                    <div className="float-right col-1 menu-icon">
                      <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray" />
                    </div>  
                  </div>
                  <div className="mar-b-15p">
                    <ProgressBar variant="warning" now={25} label={`25%`} />
                  </div>
                  <div>
                    <span className="assign">Nguyen Duy Tam</span>
                    <span className="priority low float-right">Low</span>
                  </div>               
                </div>

                <div className="col-12 list mar-t-15p">
                  <div className="row pad-b-15p">
                    <div className="float-left col-11">
                      <span>This is title of task 1 This is title of task 1</span>
                      <span className="completion excellent">Excellent</span>
                    </div>
                    <div className="float-right col-1 menu-icon">
                      <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray" />
                    </div>  
                  </div>
                  <div className="mar-b-15p">
                    <ProgressBar variant="warning" now={25} label={`25%`} />
                  </div>
                  <div>
                    <span className="assign">Nguyen Duy Tam</span>
                    <span className="priority normal float-right">Normal</span>
                  </div>               
                </div>
              </div>
            </div>

            <div className="col-4 pad-b-15p">
              <div className="list-task white-back-color bor-radius-5p shadow-box-div">
                <div className="col-12 title">
                  <span>NEW TASK</span>
                  <span className="total-task">1</span>
                </div>
                <div className="col-12 add-task-btn">
                  <FontAwesomeIcon icon={faPlus} className="fa-xs" />
                  <span className="pad-l-5p">Add new task</span>
                </div>

                <div className="col-12 list mar-t-15p">
                  <div className="row pad-b-15p">
                    <div className="float-left col-11">
                      <span>This is title of task 1 This is title of task 1</span>
                      <span className="completion excellent">Excellent</span>
                    </div>
                    <div className="float-right col-1 menu-icon">
                      <FontAwesomeIcon icon={faEllipsisV} className="fa-x1 text-gray" />
                    </div>  
                  </div>
                  <div className="mar-b-15p">
                    <ProgressBar variant="warning" now={25} label={`25%`} />
                  </div>
                  <div>
                    <span className="assign">Nguyen Duy Tam</span>
                    <span className="priority urgent float-right">Urgent</span>
                  </div>               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
