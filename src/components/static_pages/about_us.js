import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Header from '../header';
import Footer from '../footer';

class AboutUs extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="div-about-us container">
          <div className="div-team-manager row">
            <div className="col-12 div-title row">
              <div className="col-12">
                <span className="title">
                  Working like a team
                </span>
              </div>
              <div className="col-12">
                <span className="sub-title">
                  Do it better with "Better Team"
                </span>
              </div>
            </div>
            <div className="col-12 div-content row">
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 1</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 2</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 3</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 4</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 5</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 row">
                <div className="col-12 sub-title-content">
                  <span>Title content 6</span>
                </div>
                <div className="col-12 sub-content-content">
                  <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</span>
                </div>
              </div>
            </div>
            <div className="div-start-now-btn">
              <Link to = "#">Start now</Link>
            </div>
          </div>

          <div className="div-task-manager row">
            <div className="col-sm-12 col-md-6 col-lg-5 div-title">
              <p className="title">
                Manage your exercises
              </p>
              <div className="div-start-now-btn">
                <Link to = "#">Start now</Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-7 div-content">
              <div className="col-12">
                <p className="content-title">
                Create your exercises
                </p>
                <p className="content-content">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
              </div>
              <div className="col-12">
                <p className="content-title">Manage your exercises</p>
                <p className="content-content">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
