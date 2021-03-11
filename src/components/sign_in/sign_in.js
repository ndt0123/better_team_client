import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebookF , faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import '../../styles/sign_in.scss'
import * as myConstant from "../../constant.js";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(myConstant.HOST + "api/v1/sign_in", {
      user: {
        email: this.state.email,
        password: this.state.password
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
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input className="email form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email" required autoFocus onChange={this.handleChangeEmail} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={this.handleChangePassword} />
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase">Sign in</button>
                  <div className="sign-up-div">
                    <Link to = "/sign_up">Sign up</Link>
                  </div>
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-google btn-block text-uppercase">
                    <FontAwesomeIcon icon={faGoogle} className="login-icon-btn" />  Sign in with Google
                  </button>
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase">
                    <FontAwesomeIcon icon={faFacebookF} className="login-icon-btn" />  Sign in with Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
