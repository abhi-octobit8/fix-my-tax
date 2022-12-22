import React from "react";
import "./AboutPage.css";
import benefits from "../../../assets/img/benefits.png"
import transparency from "../../../assets/img/transparency.png"
import experts from "../../../assets/img/experts.png"
import tax from "../../../assets/img/tax.jpg"
import user from "../../../assets/img/user.jpg"




const AboutPage = () => (
  <>
    
    <div className="mission-head">Our Mission</div>
    <p className="mission">
      Our mission is to simplify finances, save money and time for millions of
      Indian businesses and people.
    </p>
      <br />
      <div className="section-1">
      <h6 className="sec-1-head">Your Tax Prep Comes with Built-in Reassurance</h6>
      <div className="cards-place">
        <div className="cards-in-place">
          <img
            className="img-place"
            src={benefits}
            alt=""
            width="80px"
            height="80px"
          />
          <br />
          <h6 className="headings">Maximum Benefits</h6>
          <p className="text-area">We ensure that your tax filing is hassle-free with maximum possible
          tax refund by providing our expert advice at reasonable cost.</p>
        </div>
        <div className="cards-in-place">
          <img
            className="img-place"
            src={transparency}
            alt=""
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
            src={experts}
            alt=""
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
    <h6 className="sec-2-heading">From Compliance to Financial Services, We Cover Them All</h6>

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
        alt="extra image"
        width="800px"
        height="500px"
      />
    </div>
    <br />
    <div className="sec-3">
    <h6 className="sec-3-head">Meet Our Core Team</h6>
    <hr className="taxpert-line"/>
    <br />
    <div className="">
      <div className="cards-inline">
        <div className="card">
          <img
            src={user}
            className="card-img-top"
            alt="user image"
          />
          <div className="card-body">
            <div className="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </div>
          </div>
        </div>
        <div className="card">
          <img
            src={user}
            className="card-img-top"
            alt="user image"
          />
          <div className="card-body">
            <div className="card-text">
              <h5>Name</h5>
              <h6>Designation</h6>
            </div>
          </div>
        </div>
        <div className="card">
          <img
            src={user}
            className="card-img-top"
            alt="user image"
          />
          <div className="card-body">
            <div className="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </div>
          </div>
        </div>
        <div className="card">
          <img
            src={user}
            className="card-img-top"
            alt="user image"
          />
          <div className="card-body">
            <div className="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;
