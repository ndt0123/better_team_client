import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmDeteleTaskModal extends Component {
  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
            <Modal.Title>Delete task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure want to delete this task?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
              className="close-btn-modal"
              onClick={this.props.closeModal}>
              Close
            </Button>
            <Button variant="primary"
              className="submit-btn-modal"
              type="submit"
              onClick={this.props.confirmDeteleTask}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmDeteleTaskModal;