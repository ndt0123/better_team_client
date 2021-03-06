import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmDeteleTaskModal extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.state = {
    }
  }

  onClickDelete() {
    if (this.props.directAction) {
      let data = {
        status: 'deleted'
      }
      this.props.updateTask(data);
      this.props.closeModal();
    }
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal}
          className="modal-color"
          aria-labelledby="contained-modal-title-vcenter">
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
              onClick={this.onClickDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmDeteleTaskModal;
