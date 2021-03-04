import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class TaskCommentModal extends Component {
  render() {
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
            <Modal.Title>Account setting</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" readOnly value="ndt012399@gmail.com" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="First name" required />
                </div>
                <div className="form-group col">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last name" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" className="form-control" id="birthday" placeholder="Birthday" />
                </div>
                <div className="form-group col">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone number" pattern="[0-9]{10}" />
                </div>
              </div>
              <div className="form-group">
                <legend className="col-form-label pt-0">Sex</legend>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="sex" id="maleSex" value="male" />
                  <label className="form-check-label" htmlFor="maleSex">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="sex" id="femaleSex" value="female" />
                  <label className="form-check-label" htmlFor="femaleSex">Female</label>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default TaskCommentModal;
