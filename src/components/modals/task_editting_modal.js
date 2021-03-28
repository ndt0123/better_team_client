import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class TaskEdittingModal extends Component {
  render() {
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
            <Modal.Title>Account setting</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="close-btn-modal"
                onClick={this.props.closeModal}>
                Close
              </Button>
              <Button variant="primary" className="submit-btn-modal" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default TaskEdittingModal;
