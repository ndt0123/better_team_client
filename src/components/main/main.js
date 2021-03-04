import React, {Component} from 'react';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap'

import '../../styles/main.scss';
import '../../styles/constant.scss';
import * as myConstant from "../../constant.js";
import defaultAvatar from '../../images/default-avatar.jpg';

import AccountSetting from '../account_setting/account_setting';
import Dashboard from '../dashboard/dashboard';
import PersonalWorksacpe from '../personal_workspace/personal_wokspace';
import Workspace from '../workspace/workspace';

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
        <div id="sidebar-wrapper" className="wid-16per position-fixed">
          <div className="list-group list-group-flush">

            <a href="/dashboard" className="list-group-item list-group-item-action text-white border-none pad-l-15p pad-r-15p bold-text text-center">
              Better Team
            </a>
            <a href="#" className="list-group-item list-group-item-action light-color border-none pad-l-15p pad-r-15p bold-text active-hover">
              Dashboard
            </a>
            <a href="/personal_workspace" className="list-group-item list-group-item-action light-color border-none pad-l-15p pad-r-15p bold-text active-hover">
              Your own workspace
            </a>
            <div className="list-group-item list-group-item-action light-color border-none pad-l-15p pad-r-15p">
              <div className="text-center create-workspace-btn">
                <FontAwesomeIcon icon={faPlus} className="light-color fa-xs" />
                <span className="light-color">Add new workspace</span>
              </div>
            </div>
            <div id="toggle-workspace-menu" className="list-group-item list-group-item-action light-color border-none pad-l-15p pad-r-15p active-hover" onClick={this.toggleListWorkSpace}>
              <span className="fa-pull-left pad-r-10p">
                <FontAwesomeIcon icon={this.state.showListWorkSpace ? faAngleDown : faAngleRight} className="fal" />
              </span>
              <span className="bold-text">
                Workspaces
              </span>
            </div>
            <div className={this.state.showListWorkSpace ? "display-block" : "display-none"}>
              <a href="/workspace" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p active-hover">
                # Team 1
              </a>
              <a href="/workspace" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p active-hover">
                # Team 2
              </a>
              <a href="/workspace" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p active-hover">
                # Team 3
              </a>
              <a href="/workspace" className="list-group-item list-group-item-action light-color border-none pad-l-25p pad-r-15p active-hover">
                # Team 4
              </a>
            </div>
          </div>
        </div>
        <div id="page-content-wrapper">
          <Navbar className={this.state.showSidebar ? "box-navbar" : "box-navbar toggled"} bg="light" expand="lg" fixed="top">
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
          </Navbar>
          <div className={this.state.showSidebar ? "box-main-body pad-t-56p pad-l-0p pad-r-0p" : "box-main-body pad-t-56p pad-l-0p pad-r-0p toggled"}>
            <Router>
                <Route path='/' component={Dashboard} exact />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/personal_workspace' component={PersonalWorksacpe} />
                <Route path='/workspace' component={Workspace} />
            </Router>
          </div>
        </div>

        <AccountSetting showModal={this.state.showModalAccountSetting} closeModal={this.closeModalAccountSetting} />
      </div>
    );
  }
}

export default withRouter(Main);
