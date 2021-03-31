import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import { PENDING_STATUS_VALUE,
  IN_PROGRESS_STATUS_VALUE,
  FINISHED_STATUS_VALUE } from '../../constant';

class SelectTaskStatusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        className="modal-color select-task-status-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-bold">
            Select task's status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={this.props.status === PENDING_STATUS_VALUE ? "pending list-status active" : "pending list-status"}
            onClick={() => {
              this.props.getStatus(PENDING_STATUS_VALUE);
              this.props.closeModal();
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm pending-icon" />
            <span>Pending</span>
            {
              this.props.status === PENDING_STATUS_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>

          <div
            className={this.props.status === IN_PROGRESS_STATUS_VALUE ? "in-progress list-status active" : "in-progress list-status"}
            onClick={() => {
              this.props.getStatus(IN_PROGRESS_STATUS_VALUE);
              this.props.closeModal();
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm in_progress-icon" />
            <span>In Progress</span>
            {
              this.props.status === IN_PROGRESS_STATUS_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>

          <div
            className={this.props.status === FINISHED_STATUS_VALUE ? "finished list-status active" : "finished list-status"}
            onClick={() => {
              this.props.getStatus(FINISHED_STATUS_VALUE);
              this.props.closeModal();
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm finished-icon" />
            <span>Finished</span>
            {
              this.props.status === FINISHED_STATUS_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SelectTaskStatusModal;
