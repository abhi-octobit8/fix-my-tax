import React from "react";
import max_benefit from "../../../assets/img/max_benefit.png";
import upfront from "../../../assets/img/upfront.png";
import membership from "../../../assets/img/membership_plan.png";
import tax from "../../../assets/img/about_tax.png";
import user from "../../../assets/img/user.jpg";
import "./MembershipPage.css";

const MembershipPage = () => (
  <>
    <section id="service-banner" className="service-banner">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="service-banner-info">
            <div className="service-banner-title">Membership</div>
            {/* <div>Content here...</div> */}
          </div>
        </div>
      </div>
    </section>
    <div className="section-membership">
      <img
        className="section-membership-img-place"
        src={membership}
        alt="text"
      />
      {/* <h4 className="section-membership-head">
        To use the Membership Please mail on the karsathi.ajit@gmail.com
      </h4> */}
    </div>

    <br />
  </>
);

export default MembershipPage;
