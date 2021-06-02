import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

import * as myConstant from '../../../constant';

import {
  HOST
} from "../../../constant";

class WorkspaceDetailModal extends Component {
  constructor(props) {
    super(props);
    this.getWorkspaceInfo = this.getWorkspaceInfo.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onClickJoinButton = this.onClickJoinButton.bind(this);

    this.state = {
      workspaceInfo: {},
      privateCode: '',
      errorPrivateKey: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.workspaceId !== prevProps.workspaceId) {
      let workspaceId = this.props.workspaceId;

      this.getWorkspaceInfo(workspaceId);
    }
  }

  getWorkspaceInfo(workspaceId) {
    axios({
      method: 'get',
      url: myConstant.HOST + 'api/v1/workspace/' + workspaceId,
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {}
    }).then((response) => {
      if (response.data.is_success) {
        this.setState({
          workspaceInfo: response.data.workspace
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onChangeCode = (e) => {
    this.setState({
      privateCode: e.target.value
    })
  }

  onClickJoinButton() {
    axios({
      method: 'post',
      url: HOST + 'api/v1/workspace/' + this.state.workspaceInfo.id + '/join',
      headers: {
        'auth-token': localStorage.getItem('authentication_token')
      },
      data: {
        code: this.state.privateCode
      }
    }).then((response) => {
      if(response.data.is_success) {
        this.props.getListWorkspaces();
        this.props.closeModal();
        this.props.closeSearchingModal();
      } else {
        this.setState({
          errorPrivateKey: response.data.message
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          dialogClassName="modal-50w"
          aria-labelledby="example-modal-sizes-title-lg" 
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-bold">{this.state.workspaceInfo.title}</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="description" className="text-bold">Description</label>
                <div>{this.state.workspaceInfo.description}</div>
              </div>
              {
                this.state.workspaceInfo.is_private && !this.state.workspaceInfo.belong_workspace ?
                  <div className="form-group">
                    <label htmlFor="code" className="text-bold">Workspace's code</label>
                    <input type="text" className="form-control custom-input" id="code" 
                      placeholder="Workspace's code"
                      value={this.state.privateCode}
                      onChange={this.onChangeCode}
                    />
                    <span className="text-dark-gray text-size-15p">This workspace is set to private so you have to enter private code to join into this workspace.</span>
                    <br/>
                    <span className="error-input-validate">{this.state.errorPrivateKey}</span>
                  </div> : ""
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="close-btn-modal"
                onClick={this.props.closeModal}>
                Cancel
              </Button>
              <Button variant="primary" className="submit-btn-modal"
                onClick={this.onClickJoinButton}>
                Join
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default WorkspaceDetailModal;
