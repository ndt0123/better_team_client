import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

import * as myConstant from '../../constant';

const MAX_TITLE_LENGTH = 40;

class NewWorkspaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorValidateServer: '',
      title: {value: '', error: ''},
      description: {value: '', error: ''}
    }
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

  clickOnSubmitBtn = (e) => {
    e.preventDefault();
    let title = this.state.title.value.trim();
    let description = this.state.description.value.trim();

    if (title.length > 0 && title.length <= MAX_TITLE_LENGTH && description.length > 0) {
      axios({
        method: 'post',
        url: myConstant.HOST + 'api/v1/workspace',
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          title: title,
          description: description
        }
      }).then((response) => {
        if (response.data.is_success) {
          this.setState({
            title: {value: '', error: ''},
            description: {value: '', error: ''}
          })
          this.props.updateListWorkspaces();
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
            <Modal.Title className="text-bold">New workspace</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <span className="text-dark-gray text-size-15p">Workspaces are where your team communicates. They’re best when organized around a topic — #math, for example.</span>
              <div className="form-group mar-t-15p">
                <label htmlFor="title" className="text-bold">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Workspace's title goes here" 
                  value={this.state.title.value}
                  onChange={this.onChangeTitle}
                />
                <span className="error-input-validate">{this.state.title.error}</span>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="text-bold">Description</label>
                <input type="text" className="form-control" id="description"  placeholder="Type something to describe your workspace" 
                  value={this.state.description.value} 
                  onChange={this.onChangeDescription}
                />
                <span className="text-dark-gray text-size-15p">What’s this workspace about?</span>
                <br />
                <span className="error-input-validate">{this.state.description.error}</span>
              </div>
              <div className="form-group">
                <span className="error-input-validate">{this.state.errorValidateServer}</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={this.clickOnSubmitBtn}>
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default NewWorkspaceModal;
