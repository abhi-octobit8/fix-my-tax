import React from "react";
import max_benefit from "../../../assets/img/max_benefit.png";
import upfront from "../../../assets/img/upfront.png";
import team from "../../../assets/img/team.png";
import tax from "../../../assets/img/about_tax.png";
import user from "../../../assets/img/user.jpg";
import "./AboutPage.css";

const AboutPage = () => (
  <>
    <div className="mission-head">Our Mission</div>
    <p className="mission">
      We are here to solve all your tax related queries so that you may enjoy
      peace of mind
    </p>
    <br />
    <div className="section-1">
      <h6 className="sec-1-head">
        Your Tax Prep Comes with Built-in Reassurance
      </h6>
      <div className="cards-place">
        <div className="cards-in-place">
          <img
            className="img-place"
            src={max_benefit}
            alt="text"
            width="80px"
            height="80px"
          />

          <br />
          <h6 className="headings">Maximum Benefits</h6>
          <p className="text-area">
            Our experts ensure that your tax filing is hassale free for availing
            maximum tax benefits on your income and also you enjoy spotless
            assessments
          </p>
        </div>
        <div className="cards-in-place">
          <img
            className="img-place"
            src={upfront}
            alt="text"
            width="80px"
            height="80px"
          />
          <br />
          <h6 className="headings">Upfront Transparency</h6>
          <p className="text-area">
            Some quick example text to build on the card title and makeu up the
            bulk of the card's content
          </p>
        </div>
        <div className="cards-in-place">
          <img
            className="img-place"
            src={team}
            alt="text"
            width="80px"
            height="80px"
          />
          <br />
          <h6 className="headings">Experienced tax pros</h6>
          <p className="text-area">
            Our team of professionals holds the business insight and technical
            expertise for providing best solutions.
          </p>
        </div>
      </div>
    </div>
    <br />
    <h6 className="sec-2-heading">
      From Compliance to Financial Services, We Cover Them All
    </h6>

    <div className="section-2">
      <div className="about-text">
        <br />
        We are a technology company that builds trusted, useful and insightful
        platforms for our clients to run their finances and improve their
        relationship with money. Our mission is to simplify finances, save money
        and time for millions of Indian businesses and people.
      </div>

      <img
        className="section-2-image"
        src={tax}
        alt="extra"
        width="800px"
        height="500px"
      />
    </div>
    <br />
    {/* <div className="sec-3">
      <h6 className="sec-3-head">Meet Our Core Team</h6>
      <hr className="taxpert-line" />
      <br />
      <div className="">
        <div className="cards-inline">
          <div className="card">
            <img className="card-img-top" src={user} alt="user" />

            <div className="card-body">
              <div className="card-text">
                <h5>Name</h5>
                <h6>Designation</h6>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={user} alt="user" />
            <div className="card-body">
              <div className="card-text">
                <h5>Name</h5>
                <h6>Designation</h6>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={user} alt="user" />
            <div className="card-body">
              <div className="card-text">
                <h5>Name</h5>
                <h6>Designation</h6>
              </div>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src={user} alt="user" />
            <div className="card-body">
              <div className="card-text">
                <h5>Name</h5>
                <h6>Designation</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </>
);

export default AboutPage;
