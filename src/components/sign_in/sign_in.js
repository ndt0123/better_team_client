import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebookF , faGoogle } from '@fortawesome/free-brands-svg-icons';

import '../../styles/sign_in.scss'

class SignIn extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                  <div className="sign-up-div">
                    <Link to = "/sign_up">Sign up</Link>
                  </div>
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                    <FontAwesomeIcon icon={faGoogle} className="login-icon-btn" />  Sign in with Google
                  </button>
                  <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
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

export default SignIn;

const backgroundRoot = {
  background: "#007bff",
  background: "linear-gradient(to right, #0062E6, #33AEFF)"
}
