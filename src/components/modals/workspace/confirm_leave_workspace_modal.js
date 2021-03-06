import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmLeaveWorkspaceModal extends Component {
  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          aria-labelledby="example-modal-sizes-title-lg"
          className="modal-color">
          <Modal.Header closeButton>
            <Modal.Title>Leave workspace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Are you sure want to leave this workspace?</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
              className="close-btn-modal"
              onClick={() => {
                this.props.closeModal()
              }}>
              Close
            </Button>
            <Button variant="primary"
              className="submit-btn-modal"
              onClick={() => {
                this.props.confirmLeaveWorkspace()
              }}>
              Leave
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmLeaveWorkspaceModal;
