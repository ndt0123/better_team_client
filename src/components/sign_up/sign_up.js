import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import '../../styles/sign_in.scss';
import * as myConstant from "../../constant.js";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  }

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleChangePasswordConfirmation = event => {
    this.setState({ passwordConfirmation: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(myConstant.HOST + "api/v1/sign_up", {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }, {
      headers: {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": "apikey",
        "content-type": "application/json",
        "accept": "application/json"
      }
    })
    .then(response => {
      localStorage.setItem ('authentication_token', response.data.data.user.authentication_token);
      console.log(localStorage.getItem('authentication_token'));
      this.props.history.push('/dashboard');
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputFirstName">First name</label>
                    <input type="text" className="form-control" id="inputFirstName" placeholder="First name" value={this.state.firstName} required onChange={this.handleChangeFirstName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last name</label>
                    <input type="text" className="form-control" id="inputLastName" placeholder="Last name" value={this.state.lastName} required onChange={this.handleChangeLastName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail1">Email address</label>
                    <input className="email form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email"  value={this.state.email} required autoFocus onChange={this.handleChangeEmail} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} required onChange={this.handleChangePassword} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPasswordConfirmation">Password confirmation</label>
                    <input type="password" className="form-control" id="inputPasswordConfirmation" placeholder="Password confirmation" value={this.state.passwordConfirmation} required onChange={this.handleChangePasswordConfirmation} />
                  </div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase">Sign up</button>
                  <div className="sign-up-div">
                    <Link to = "/sign_in">Sign in</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
