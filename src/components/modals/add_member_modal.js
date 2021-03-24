import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import * as myConstant from '../../constant';
import defaultAvatar from '../../images/default-avatar.jpg';

class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.addMember = this.addMember.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.state = {
      searchKey: '',
      isFocusSearchInput: false,
      allUsers: [],
      errorAddMember: ''
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers(searchKey = '') {
    let workspaceId = this.props.workspaceId;
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/workspace/' + workspaceId + '/all_users',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        search_key: searchKey
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          allUsers: response.data.users
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  addMember(user_id) {
    let workspaceId = this.props.workspaceId;
    axios({
      method: 'post',
      url: myConstant.HOST + 'api/v1/workspace/' + workspaceId + '/add_members',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        user_ids: [user_id]
      }
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          errorAddMember: ''
        })
        this.getAllUsers(this.state.searchKey.trim());
      } else {
        this.setState({
          errorAddMember: response.data.message
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onChangeSearchInput = (e) => {
    this.setState({
      searchKey: e.target.value
    })

    let searchKey = e.target.value.trim();
    this.getAllUsers(searchKey);
  }

  render() {
    const ListUsers = ({allUsers}) => (
      <div className="list-users">
        {allUsers.map((user, index) => (
          <div key={index} className="member row clearfix">
            <div className="avatar">
              <img src={defaultAvatar} alt="Avatar" className="rounded-circle" />
            </div>
            <div>
              <div className="full-name">
                <span>{user.first_name} </span>
                <span>{user.last_name}</span>
              </div>
              <div className="email text-dark-gray text-size-15p">{user.email}</div>
            </div>
            <div className="ml-auto action">
              <FontAwesomeIcon icon={faUserPlus} data-tip data-for="addMemberTip"
                className="fa-sm"
                onClick={() => {
                  this.addMember(user.id)
                }}/>
            </div>
          </div>
        ))}
        <ReactTooltip id="addMemberTip" place="bottom" effect="solid">
          Add
        </ReactTooltip>
      </div>
    );

    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        aria-labelledby="example-modal-sizes-title-lg" 
        className="add-member-modal"
      >
        <Modal.Header closeButton className="add-member-header">
          <Modal.Title className="text-bold">
            Add members
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-user-input">
            <input type="text" placeholder="Enter a name or email"
              className={this.state.isFocusSearchInput ? "focus-input col-12" : "blur-input col-12"}
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

          <span className="error-input-validate">{this.state.errorAddMember}</span>
          <ListUsers allUsers={this.state.allUsers} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddMemberModal;
