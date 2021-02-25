import React, {Component} from 'react';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import '../../styles/main.scss';
import '../../styles/constant.scss';
import * as myConstant from "../../constant.js";
import defaultAvatar from '../../images/default-avatar.jpg';

import AccountSetting from '../account_setting/account_setting';
import Dashboard from '../dashboard/dashboard';
import PersonalWorksacpe from '../personal_workspace/personal_wokspace';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      showListWorkSpace: true,
      showModalAccountSetting: false
    }
  }

  toggleMenu = (event) => {
    event.preventDefault();
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  toggleListWorkSpace = () => {
    this.setState({
      showListWorkSpace: !this.state.showListWorkSpace
    })
  }

  toggleModalAccountSetting = () => {
    this.setState({
      showModalAccountSetting: !this.state.showModalAccountSetting
    })
  }

  closeModalAccountSetting = () => {
    this.setState({
      showModalAccountSetting: false
    })
  }

  onClickLogOut = (event) => {
    event.preventDefault();
    axios.post(myConstant.HOST + "api/v1/sign_out")
    .then(response => {
      localStorage.removeItem('authentication_token');
      console.log(localStorage.getItem('authentication_token'));
      this.props.history.push('/sign_in');
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <div className={this.state.showSidebar ? "d-flex" : "d-flex toggled"} id="wrapper">
        <div id="sidebar-wrapper">
          <div className="sidebar-heading logo border-bottom pad-l-15p pad-r-15p">
            <a href="/dashboard" className="white-color none-text-decoration bold-text">Better Team</a>
          </div>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action white-color border-none pad-l-15p pad-r-15p bold-text">
              Dashboard
            </a>
            <a href="#" className="list-group-item list-group-item-action white-color border-none pad-l-15p pad-r-15p bold-text">
              Your workspace
            </a>
            <div id="toggle-workspace-menu" className="list-group-item list-group-item-action white-color border-none pad-l-15p pad-r-15p" onClick={this.toggleListWorkSpace}>
              <span className="fa-pull-left pad-r-10p">
                <FontAwesomeIcon icon={this.state.showListWorkSpace ? faAngleDown : faAngleRight} className="fal" />
              </span>
              <span className="bold-text">
                Workspaces
              </span>
            </div>
            <div className={this.state.showListWorkSpace ? "display-block" : "display-none"}>
              <a href="#" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p">
                # Team 1
              </a>
              <a href="#" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p">
                # Team 2
              </a>
              <a href="#" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p">
                # Team 3
              </a>
              <a href="#" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p">
                # Team 4
              </a>
            </div>
          </div>
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div id="menu-toggle" onClick={this.toggleMenu}>
              <FontAwesomeIcon icon={faBars} className="fa-lg" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link white-color" href="#">
                    Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link white-color" href="#">Link</a>
                </li>
                <li className="nav-item dropdown account-setting">
                  <a className="nav-link dropdown-toggle white-color" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <div className="user-info">
                      <div className="text-center info-avatar">
                        <img src={defaultAvatar} />
                      </div>
                      <div className="text-center">
                        <span className="info-name">Nguyen duy tam</span>
                        <br/>
                        <span className="info-email">ndt012399@gmail.com</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <span className="dropdown-item hover-cursor-pointer" onClick={this.toggleModalAccountSetting}>Account setting</span>
                    <span className="dropdown-item hover-cursor-pointer" onClick={this.onClickLogOut}>Log out</span>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid box-main-body pad-0p">
            <Router>
                <Route path='/' component={Dashboard} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/personal_workspace' component={PersonalWorksacpe} />
            </Router>
          </div>
        </div>

        <AccountSetting showModal={this.state.showModalAccountSetting} closeModal={this.closeModalAccountSetting} />
      </div>
    );
  }
}

export default withRouter(Main);
