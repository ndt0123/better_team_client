import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faChartLine, faCircle, faEdit, faFileAlt, faListUl } from "@fortawesome/free-solid-svg-icons";

import '../../styles/dashboard.scss';
import '../../styles/main.scss';
import '../../styles/constant.scss';

class Dashboard extends Component {
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
