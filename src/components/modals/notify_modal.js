import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class NotifyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  render() {
    return(
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.notifyContent}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default NotifyModal;
