import React from "react";
import "./AboutPage.css";

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
            src="https://cdn-icons-png.flaticon.com/512/1578/1578656.png"
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
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/audit-2010222-1696751.png"
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
            src="https://cdn.iconscout.com/icon/premium/png-128-thumb/expert-team-2625507-2178318.png"
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
        src="https://img.freepik.com/free-vector/businessman-accountant-filling-financial-document-form-clipboard-payment-date-tax-form-income-tax-return-company-tax-payment-concept-illustration_335657-2320.jpg?w=2000"
        alt="extra image"
        width="800px"
        height="500px"
      />
    </div>
    <br />
    <div className="sec-3">
    <h6 className="sec-3-head">Meet Our Core Team</h6>
    <hr className="underline"/>
    <br />
    <div className="">
      <div className="cards-inline">
        <div class="card">
          <img
            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
            class="card-img-top"
            alt="user image"
          />
          <div class="card-body">
            <p class="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
            class="card-img-top"
            alt="user image"
          />
          <div class="card-body">
            <p class="card-text">
              <h5>Name</h5>
              <h6>Designation</h6>
            </p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
            class="card-img-top"
            alt="user image"
          />
          <div class="card-body">
            <p class="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
            class="card-img-top"
            alt="user image"
          />
          <div class="card-body">
            <p class="card-text">
            <h5>Name</h5>
              <h6>Designation</h6>
           </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;
