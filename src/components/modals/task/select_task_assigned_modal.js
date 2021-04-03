import axios from 'axios';
import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { HOST } from '../../../constant';
import defaultAvatar from '../../../images/default-avatar.jpg';

class SelectTaskAssignedModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
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
      url: HOST + 'api/v1/workspace/' + workspaceId + '/all_members',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      params: {
        search_key: searchKey,
        all: true
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

  onChangeSearchInput = (e) => {
    this.setState({
      searchKey: e.target.value
    })

    let searchKey = e.target.value.trim();
    this.getAllMembers(searchKey);
  }

  render() {
    const ListUsers = ({allMembers}) => (
      <div className="list-users">
        {allMembers.map((member, index) => (
          <div key={index}
            className={this.props.assignedId === member.id ?
              "member row clearfix active" : "member row clearfix"}
            onClick={() => {
              let fullName = member.first_name + " " + member.last_name;
              this.props.getAssigned(member.id, fullName);
              this.props.closeModal();
            }}>
            <div className="avatar">
              <img src={defaultAvatar} alt="Avatar" />
            </div>
            <div>
              <div className="full-name">
                <span>{member.first_name} </span>
                <span>{member.last_name}</span>
              </div>
              <div className="email text-dark-gray text-size-15p">{member.email}</div>
            </div>
            {
              this.props.assignedId === member.id ?
                <div className="ml-auto action">
                  <FontAwesomeIcon icon={faCheck}
                    className="fa-sm"/>
                </div> : ""
            }
          </div>
        ))}
      </div>
    );

    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        className="select-task-assigned-modal modal-color"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="add-member-header">
          <Modal.Title className="text-bold">
            Assign task to
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-user-input-custom">
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
