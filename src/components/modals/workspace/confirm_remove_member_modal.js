import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmRemoveMemberModal extends Component {
  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          aria-labelledby="example-modal-sizes-title-lg"
          className="modal-color">
          <Modal.Header closeButton>
            <Modal.Title>Remove member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Are you sure want to remove </span>
            <span className="text-bold">{this.props.fullName}</span>
            <span> from workspace?</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="close-btn-modal" onClick={() => {
              this.props.closeModal()
            }}>
              Close
            </Button>
            <Button variant="primary" className="submit-btn-modal" onClick={() => {
              this.props.confirmRemove(this.props.memberId)
            }}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmRemoveMemberModal;
