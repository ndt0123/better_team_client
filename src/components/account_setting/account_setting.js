import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import * as myConstant from "../../constant.js";

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      birthday: '',
      phone_number: '',
      address: '',
      university: '',
      facebook: '',
      sex: '',
      errorsMessages: '',
      errorValidate: {
        first_name: '',
        last_name: ''
      }
    }
  }
  
  componentWillReceiveProps(prevProps, prevState) {
    if(prevProps.accountInfo !== this.props.accountInfo){
      this.setState({
        email: prevProps.accountInfo.email,
        first_name: prevProps.accountInfo.first_name,
        last_name: prevProps.accountInfo.last_name,
        birthday: prevProps.accountInfo.birthday,
        phone_number: prevProps.accountInfo.phone_number,
        address: prevProps.accountInfo.address,
        university: prevProps.accountInfo.university,
        facebook: prevProps.accountInfo.facebook,
        sex: prevProps.accountInfo.sex
      });
    }
  }

  clickOnSubmit = (e) => {
    e.preventDefault();
    if(this.state.errorValidate.first_name === '' && this.state.errorValidate.last_name === '') {
      axios({
        method: 'patch',
        url: myConstant.HOST + 'api/v1/update_account',
        headers: {
          'auth-token': localStorage.getItem('authentication_token')
        },
        data: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          birthday: this.state.birthday,
          phone_number: this.state.phone_number,
          address: this.state.address,
          university: this.state.university,
          facebook: this.state.facebook,
          sex: this.state.sex
        }
      }).then((response) => {
        if(response.data.is_success) {
          this.setState({
            email: response.data.user.email,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            birthday: response.data.user.birthday,
            phone_number: response.data.user.phone_number,
            address: response.data.user.address,
            university: response.data.user.university,
            facebook: response.data.user.facebook,
            sex: response.data.user.sex,
            errorsMessages: ''
          })
          let firstName = response.data.user.first_name;
          let lastName = response.data.user.last_name;
          this.props.updateNameAndEmail(firstName + ' ' + lastName);
          this.props.closeModal();
        } else {
          this.setState({
            errorsMessages: response.data.errors
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
  
  onChangeFirstName = (e) => {
    let first_name = e.target.value.trim();
    if(first_name === '') {
      this.setState({
        first_name: first_name,
        errorValidate: {
          first_name: 'First name can not be blank!',
          last_name: this.state.errorValidate.last_name
        }
      })
    } else {
      this.setState({
        first_name: first_name,
        errorValidate: {
          first_name: '',
          last_name: this.state.errorValidate.last_name
        }
      })
    }
  }

  onChangeLastName = (e) => {
    let last_name = e.target.value.trim();
    if(last_name === '') {
      this.setState({
        last_name: last_name,
        errorValidate: {
          first_name: this.state.errorValidate.first_name,
          last_name: 'Last name can not be blank!'
        }
      })
    } else {
      this.setState({
        last_name: last_name,
        errorValidate: {
          first_name: this.state.errorValidate.first_name,
          last_name: ''
        }
      })
    }
  }

  render() {
    return(
      <div>
        <Modal show={this.props.showModal}
          onHide={this.props.closeModal} 
          size="lg" 
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Account setting</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div>
                <img src={require('../../images/default-avatar.jpg')} alt="Avatar" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" readOnly value={this.state.email} />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="First name" value={this.state.first_name} required onChange={this.onChangeFirstName} />
                  <span className="error-input-validate">{this.state.errorValidate.first_name}</span>
                </div>
                <div className="form-group col">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last name" value={this.state.last_name} required onChange={this.onChangeLastName} />
                  <span className="error-input-validate">{this.state.errorValidate.last_name}</span>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" className="form-control" id="birthday" placeholder="Birthday" value={this.state.birthday} onChange={(e) => {
                    this.setState({
                      birthday: e.target.value
                    })
                  }} />
                </div>
                <div className="form-group col">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone number" pattern="[0-9]{10}" value={this.state.phone_number} onChange={(e) => {
                    this.setState({
                      phone_number: e.target.value
                    })
                  }} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Address" value={this.state.address} onChange={(e) => {
                  this.setState({
                    address: e.target.value
                  })
                }} />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="university">University</label>
                  <input type="text" className="form-control" id="university" placeholder="University" value={this.state.university} onChange={(e) => {
                    this.setState({
                      university: e.target.value
                    })
                  }} />
                </div>
                <div className="form-group col">
                  <label htmlFor="facebook">Facebook</label>
                  <input type="text" className="form-control" id="facebook" placeholder="Facebook" value={this.state.facebook} onChange={(e) => {
                    this.setState({
                      facebook: e.target.value
                    })
                  }} />
                </div>
              </div>
              <div className="form-group">
                <legend className="col-form-label pt-0">Sex</legend>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="sex" id="maleSex" value="male" checked={this.state.sex === "male"} onChange={(e) => {
                    this.setState({
                      sex: e.target.value
                    })
                  }} />
                  <label className="form-check-label" htmlFor="maleSex">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="sex" id="femaleSex" value="female" checked={this.state.sex === "female"} onChange={(e) => {
                    this.setState({
                      sex: e.target.value
                    })
                  }} />
                  <label className="form-check-label" htmlFor="femaleSex">Female</label>
                </div>
              </div>
              <div>
                <span className="error-input-validate">{this.state.errorsMessages}</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={this.clickOnSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AccountSetting;
