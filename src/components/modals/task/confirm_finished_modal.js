import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmFinishedModal extends Component {
  constructor(props) {
    super(props);
    this.onClickConfirmBtn = this.onClickConfirmBtn.bind(this);
    this.state = {
    }
  }

  onClickConfirmBtn() {
    if (this.props.directAction) {
      let data = {
        status: 'finished'
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
            <Modal.Title>Mark as finished</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure want to mark this task as finished?</p>
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
              onClick={this.onClickConfirmBtn}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConfirmFinishedModal;
