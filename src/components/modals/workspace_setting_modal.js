import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import * as myConstant from '../../constant';
import defaultAvatar from '../../images/default-avatar.jpg';

import ConfirmRemoveMemberModal from './confirm_remove_member_modal';

const MAX_TITLE_LENGTH = 40;

class WorkspaceSettingModal extends Component {
  constructor(props) {
    super(props);
    this.onClickRemoveMember = this.onClickRemoveMember.bind(this);
    this.closeConfirmRemoveMember = this.closeConfirmRemoveMember.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.state = {
      errorValidateServer: '',
      title: {value: '', error: ''},
      description: {value: '', error: ''},
      is_private: {value: false, error: ''},
      code: {value: '', error: ''},
      isActiveSetting: true,
      allMembers: [],
      errorRemoveMember: '',
      showConfirmRemoveMember: false,
      removeMember: {id: 0, fullName: ''},
      isFocusSearchInput: false,
      searchKey: ''
    }
  }

  componentDidMount() {
    this.getWorkspaceInfo();
    this.getAllMembers("");
  }

  getAllMembers(searchKey) {
    let workspaceId = this.props.workspaceId;
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/workspace/' + workspaceId + '/all_members',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        search_key: searchKey
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          allMembers: response.data.members
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  getWorkspaceInfo() {
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/workspace/' + this.props.workspaceId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {}
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          title: {value: response.data.workspace.title, error: ''},
          description: {value: response.data.workspace.description, error: ''},
          is_private: {value: response.data.workspace.is_private, error: ''},
          code: {value: response.data.workspace.code, error: ''}
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onChangeTitle = (e) => {
    let titleLength = e.target.value.trim().length;
    let error = ''
    switch(true) {
      case titleLength === 0: {
        error = 'Title can not be blank!';
        break;
      }
      case titleLength > MAX_TITLE_LENGTH: {
        error = 'Title is too long. It is limited by 40 characters!';
        break;
      }
    }
    this.setState({
      title: {
        value: e.target.value,
        error: error
      }
    })
  }

  onChangeDescription = (e) => {
    let titleLength = e.target.value.trim().length;
    let error = '';
    if (titleLength === 0) {
      error = 'Description can not be blank!'
    }
    this.setState({
      description: {
        value: e.target.value,
        error: error
      }
    });
  }

  onChangeIsPrivate = (e) => {
    if (this.state.is_private.value) {
      this.setState({
        code: {
          value: '',
          error: ''
        }
      })
    }
    this.setState({
      is_private: {
        value: !this.state.is_private.value,
        error: ''
      }
    })
  }

  onChangeCode = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let error = '';
    if (value === '' && this.state.is_private.value) {
      error = "Code can't be blank!";
    } else if (value.length < 5 || value.length > 10) {
      error = 'Code must have 5-10 characters!'
    }
    this.setState({
      code: {
        value: value,
        error: error
      }
    })
  }

  closeConfirmRemoveMember() {
    this.setState({
      showConfirmRemoveMember: false
    })
  }

  onClickRemoveMember = (member_id) => {
    let workspaceId = this.props.workspaceId;
    axios({
      method: 'post',
      url: myConstant.HOST + 'api/v1/workspace/' + workspaceId + '/remove_members',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        user_ids: [member_id]
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          allMembers: response.data.members,
          errorRemoveMember: ''
        })
      } else {
        this.setState({
          errorRemoveMember: response.data.message
        })
      }
    }).catch((error) => {
      console.log(error);
    })
    this.closeConfirmRemoveMember();
  }

  clickOnSubmitBtn = (e) => {
    e.preventDefault();
    let title = this.state.title.value.trim();
    let description = this.state.description.value.trim();
    let code = this.state.code.value == null ? '' : this.state.code.value;
    let is_private = this.state.is_private.value;
    let workspaceId = this.props.workspaceId;

    if (title.length > 0 && title.length <= MAX_TITLE_LENGTH && description.length > 0
      && (!is_private || (is_private && code.length > 4 && code.length < 11))) {
      axios({
        method: 'patch',
        url: myConstant.HOST + 'api/v1/workspace/' + workspaceId,
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          title: title,
          description: description,
          code: code,
          is_private: is_private
        }
      }).then((response) => {
        if (response.data.is_success) {
          this.props.closeModal();
        } else {
          this.setState({
            errorValidateServer: response.data.error
          })
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  onChangeSearchInput = (e) => {
    this.setState({
      searchKey: e.target.value
    })
    let searchKey = e.target.value.trim();

    if (searchKey !== '') {
      this.getAllMembers(searchKey);
    }
  }

  render() {
    const ListMembers = ({allMembers}) => (
      <div className="list-members">
        {allMembers.map((member, index) => (
          <div key={index} className="member row clearfix">
            <div className="avatar">
              <img src={defaultAvatar} alt="Avatar" className="rounded-circle" />
            </div>
            <div>
              <div className="full-name">
                <span>{member.first_name} </span>
                <span>{member.last_name}</span>
                <span className={member.role === "admin" ? "dislay-block role" : "display-none role"}>(Admin)</span>
              </div>
              <div className="email text-dark-gray text-size-15p">{member.email}</div>
            </div>
            <div className="ml-auto action">
              <FontAwesomeIcon icon={faUserSlash} data-tip data-for="removeMemberTip"
                className={member.role === "admin" ? "fa-sm remove display-none" : "fa-sm remove display-block"}
                onClick={() => {
                  this.setState({
                    removeMember: {
                      id: member.id,
                      fullName: member.first_name + " " + member.last_name
                    },
                    showConfirmRemoveMember: true
                  })
                }}/>
            </div>
          </div>
        ))}

        <ReactTooltip id="removeMemberTip" place="bottom" effect="solid">
          Remove
        </ReactTooltip>
        <ConfirmRemoveMemberModal showModal={this.state.showConfirmRemoveMember}
          closeModal={this.closeConfirmRemoveMember}
          confirmRemove={this.onClickRemoveMember}
          memberId={this.state.removeMember.id}
          fullName={this.state.removeMember.fullName}
        />
      </div>
    );

    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          dialogClassName="modal-50w"
          aria-labelledby="example-modal-sizes-title-lg" 
          className="workspace-setting"
        >
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title className="text-bold">
              Workspace Setting

              <div className="box-header-option">
                <div className={this.state.isActiveSetting ? "header-option active" : "header-option inactive"}
                  onClick={() => {
                    this.setState({
                      isActiveSetting: true
                    })
                  }}>
                  Information
                </div>
                <div className={!this.state.isActiveSetting ? "header-option active" : "header-option inactive"}
                  onClick={() => {
                    this.setState({
                      isActiveSetting: false
                    })
                  }}>
                  Members
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className={this.state.isActiveSetting ? "display-block" : "display-none"}>
                <span className="text-dark-gray text-size-15p">Workspaces are where your team communicates. They’re best when organized around a topic — #math, for example.</span>
                <div className="form-group mar-t-15p">
                  <label htmlFor="title" className="text-bold">Title</label>
                  <input type="text" className="form-control custom-input" id="title" placeholder="Workspace's title goes here" 
                    value={this.state.title.value}
                    onChange={this.onChangeTitle}
                  />
                  <span className="error-input-validate">{this.state.title.error}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="text-bold">Description</label>
                  <input type="text" className="form-control custom-input" id="description"  placeholder="Type something to describe your workspace" 
                    value={this.state.description.value} 
                    onChange={this.onChangeDescription}
                  />
                  <span className="text-dark-gray text-size-15p">What’s this workspace about?</span>
                  <br />
                  <span className="error-input-validate">{this.state.description.error}</span>
                </div>
                <div className="form-group custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input custom-input"
                    id="is-private"
                    checked={this.state.is_private.value}
                    onChange={this.onChangeIsPrivate}
                  />
                  <label className="custom-control-label" htmlFor="is-private">
                    Set workspace to private
                  </label>
                </div>
                <div className={this.state.is_private.value ? "form-group display-block" : "form-group display-none"}>
                  <label htmlFor="code" className="text-bold">Workspace's code</label>
                  <input type="text" className="form-control custom-input" id="code" 
                    placeholder="Workspace's code"
                    value={this.state.code.value}
                    onChange={this.onChangeCode}
                  />
                  <span className="text-dark-gray text-size-15p">Input your workspace's code so other users can join to workspace by this code.</span>
                  <br/>
                  <span className="error-input-validate">{this.state.code.error}</span>
                </div>
                <div className="form-group">
                  <span className="error-input-validate">{this.state.errorValidateServer}</span>
                </div>
              </div>

              <div className={this.state.isActiveSetting ? "display-none member-setting row" : "display-block member-setting row"}>
                <div className="search-user-input">
                  <input type="text" placeholder="Type to search members"
                    className={this.state.isFocusSearchInput ? "focus-input col-sm-12 col-md-9 col-lg-8 custom-input" : "blur-input col-sm-12 col-md-9 col-lg-8 custom-input"}
                    value={this.state.searchKey}
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
                
                <div className="text-dark-gray text-center member-counting">
                  You and {this.state.allMembers.length} other members
                </div>
                <ListMembers allMembers={this.state.allMembers} />
                <span className="error-input-validate">{this.state.errorRemoveMember}</span>
              </div>
            </Modal.Body>
            <div className={this.state.isActiveSetting ? "display-block" : "display-none"}>
              <Modal.Footer>
                <Button variant="secondary" className="close-btn-modal"
                  onClick={this.props.closeModal}>
                  Close
                </Button>
                <Button variant="primary" className="submit-btn-modal" type="submit"
                  onClick={this.clickOnSubmitBtn}>
                  Save
                </Button>
              </Modal.Footer>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default WorkspaceSettingModal;
