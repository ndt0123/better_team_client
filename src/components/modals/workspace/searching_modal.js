import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faCheck, faComments, faHashtag, faLock, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import {
  HOST
} from "../../../constant";

import WorkspaceDetailModal from './workspace_detail_modal';

const WORKSPACE = 'workspace';
const USER = 'user';
const MESSAGE = 'message';

class SearchingModal extends Component {
  constructor(props) {
    super(props);
    this.getWorkspaceResults = this.getWorkspaceResults.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.closeWorkspaceDetailModal = this.closeWorkspaceDetailModal.bind(this);
    this.onClickWorkspace = this.onClickWorkspace.bind(this);

    this.state = {
      showWorkspaceDetailModal: {
        isShow: false,
        id: 0
      },
      searchOption: WORKSPACE,
      workspaceResults: []
    }
  }

  getWorkspaceResults(searchKey) {
    axios({
      method: 'get',
      url: HOST + 'api/v1/all_workspaces',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        search_key: searchKey
      }
    }).then((response) => {
      this.setState({
        workspaceResults: response.data.workspaces
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

  onClickWorkspace = (id, belong_workspace) => {
    if (belong_workspace) {
    } else {
      this.setState({
        showWorkspaceDetailModal: {
          isShow: true,
          id: id
        }
      })
    }
  }

  onChangeSearchInput = (e) => {
    if (this.state.searchOption === WORKSPACE) {
      this.getWorkspaceResults(e.target.value);
    }
  }

  closeWorkspaceDetailModal() {
    this.setState({
      showWorkspaceDetailModal: {
        isShow: false,
        id: 0
      }
    })
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
          className="searching-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon={faSearch} className="fa-xs" />
              <input type="text"
                placeholder="Type to search"
                onChange={this.onChangeSearchInput}/>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="search-option">
              <div className="desc">
                <span>I'm looking for...</span>
              </div>
              <div className="options">
                <div className={
                  this.state.searchOption === WORKSPACE ?
                  "option active" : "option"
                }>
                  <FontAwesomeIcon icon={faBoxes} className="fa-xs" />
                  <span>Workspace</span>
                </div>

                <div className={
                  this.state.searchOption === MESSAGE ?
                  "option active" : "option"
                }>
                  <FontAwesomeIcon icon={faComments} className="fa-xs" />
                  <span>Message</span>
                </div>

                <div className={
                  this.state.searchOption === USER ?
                  "option active" : "option"
                }>
                  <FontAwesomeIcon icon={faUser} className="fa-xs" />
                  <span>User</span>
                </div>
              </div>
            </div>

            <div className="searching-results">
              <div className="desc">
                <span>Searching results...</span>
              </div>
              <div className="results">
                {
                  this.state.searchOption === WORKSPACE ?
                    <div className="workspace list-items">
                      {
                        this.state.workspaceResults.map((workspace, index) => (
                          workspace.belong_workspace ?
                          <div className="result" key={index}>
                            <a  href={"/workspace/" + workspace.id} key={index}>
                              {
                                workspace.is_private ?
                                  <FontAwesomeIcon icon={faLock} className="fa-xs private-icon"/> :
                                  <FontAwesomeIcon icon={faHashtag} className="fa-xs private-icon"/>
                              }
                              <span className="title">{workspace.title}</span>
                              <span className="description"> - {workspace.description}</span>
                              <FontAwesomeIcon icon={faCheck} className="fa-xs float-right check-icon"/>
                            </a>
                          </div> :
                          <div className="result"
                            key={index}
                            onClick={() => {
                              this.onClickWorkspace(workspace.id, workspace.belong_workspace)
                            }}>
                            {
                              workspace.is_private ?
                                <FontAwesomeIcon icon={faLock} className="fa-xs private-icon"/> :
                                <FontAwesomeIcon icon={faHashtag} className="fa-xs private-icon"/>
                            }
                            <span className="title">{workspace.title}</span>
                            <span className="description"> - {workspace.description}</span>
                          </div>
                        ))
                      }
                    </div> :
                    this.state.searchOption === USER ?
                      <div className="user list-items">
                        <div className="result">
                          <FontAwesomeIcon icon={faLock} className="fa-xs" />
                          <span>User</span>
                        </div>
                      </div> :
                      <div className="message list-items">
                        <div className="result">
                          <FontAwesomeIcon icon={faLock} className="fa-xs" />
                          <span>Message</span>
                        </div>
                      </div>
                }
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <WorkspaceDetailModal showModal={this.state.showWorkspaceDetailModal.isShow}
          closeModal={this.closeWorkspaceDetailModal}
          workspaceId={this.state.showWorkspaceDetailModal.id}
          getListWorkspaces={this.props.getListWorkspaces}
          closeSearchingModal={this.props.closeModal}
        />
      </div>
    );
  }
}

export default SearchingModal;
