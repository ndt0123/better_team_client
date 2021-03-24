import axios from 'axios';
import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import * as myConstant from '../../constant';
import defaultAvatar from '../../images/default-avatar.jpg';

class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="close-btn-modal" onClick={this.props.closeModal}>
            Close
          </Button>
          <Button variant="primary" className="submit-btn-modal">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewTaskModal;
