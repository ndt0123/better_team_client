import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import * as myConstant from '../../constant';
import defaultAvatar from '../../images/default-avatar.jpg';

class SelectTaskAssignedModal extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    // this.addMember = this.addMember.bind(this);
    this.getAllMembers = this.getAllMembers.bind(this);
    this.state = {
      searchKey: '',
      isFocusSearchInput: false,
      allMembers: [],
      errorAddMember: ''
    }
  }

  componentDidMount() {
    this.getAllMembers();
  }

  getAllMembers(searchKey = '') {
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

  // // addMember(user_id) {
  // //   let workspaceId = this.props.workspaceId;
  // //   axios({
  // //     method: 'post',
  // //     url: myConstant.HOST + 'api/v1/workspace/' + workspaceId + '/add_members',
  // //     headers: {
  // //       'auth-token': localStorage.getItem('authentication_token')
  // //     },
  // //     data: {
  // //       user_ids: [user_id]
  // //     }
  // //   }).then((response) => {
  // //     if (response.data.is_success) {
  // //       this.setState({
  // //         errorAddMember: ''
  // //       })
  // //       this.getAllMembers(this.state.searchKey.trim());
  // //     } else {
  // //       this.setState({
  // //         errorAddMember: response.data.message
  // //       })
  // //     }
  // //   }).catch((error) => {
  // //     console.log(error);
  // //   })
  // // }

  onChangeSearchInput = (e) => {
    this.setState({
      searchKey: e.target.value
    })

    let searchKey = e.target.value.trim();
    this.getAllMembers(searchKey);
    console.log(this.state);
  }

  render() {
    const ListUsers = ({allMembers}) => (
      <div className="list-users">
        {allMembers.map((user, index) => (
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
              <FontAwesomeIcon icon={faUserPlus}
                className="fa-sm"/>
            </div>
          </div>
        ))}
      </div>
    );

    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        className="add-member-modal modal-color"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
          <ListUsers allMembers={this.state.allMembers} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default SelectTaskAssignedModal;
