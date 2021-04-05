import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

import {
  LOW_PRIORITY_VALUE,
  NORMAL_PRIORITY_VALUE,
  HIGH_PRIORITY_VALUE
} from '../../../constant';

class SelectTaskPriorityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onClickPriority(priority) {
    if (this.props.directAction) {
      let data = {
        priority: priority
      }
      this.props.updateTask(data);
    } else {
      this.props.getPriority(priority);
    }
    this.props.closeModal();
  }

  render() {
    return(
      <Modal show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="modal-50w"
        className="modal-color select-task-priority-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-bold">
            Select task's priority
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={this.props.priority === LOW_PRIORITY_VALUE ? "low list-priority active" : "low list-priority"}
            onClick={() => {
              this.onClickPriority(LOW_PRIORITY_VALUE);
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm low-icon" />
            <span>Low</span>
            {
              this.props.priority === LOW_PRIORITY_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>

          <div
            className={this.props.priority === NORMAL_PRIORITY_VALUE ? "normal list-priority active" : "normal list-priority"}
            onClick={() => {
              this.onClickPriority(NORMAL_PRIORITY_VALUE);
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm normal-icon" />
            <span>Normal</span>
            {
              this.props.priority === NORMAL_PRIORITY_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>

          <div
            className={this.props.priority === HIGH_PRIORITY_VALUE ? "high list-priority active" : "high list-priority"}
            onClick={() => {
              this.onClickPriority(HIGH_PRIORITY_VALUE);
            }}>
            <FontAwesomeIcon icon={faCircle} className="fa-sm high-icon" />
            <span>High</span>
            {
              this.props.priority === HIGH_PRIORITY_VALUE ?
                <FontAwesomeIcon icon={faCheck} className="fa-sm float-right" /> : ""
            }
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SelectTaskPriorityModal;
