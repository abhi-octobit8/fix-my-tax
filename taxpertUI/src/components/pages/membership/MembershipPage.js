import React from "react";
import membership from "../../../assets/img/membership_new.png";
import "./MembershipPage.css";
import SeoHeader from "../../../common/seo/SeoHeader";
import { TAGS } from "../../../shared/constant/Tags";

const MembershipPage = () => (
  <>
    <SeoHeader
      title={TAGS.membership_plan.title}
      description={TAGS.membership_plan.decription}
    />
    <section id="service-banner" className="section-banner">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="section-banner-info">
            <div className="section-banner-title">Membership</div>
            <p className="section-banner-data">
              We are delighted to offer you our membership plans. Our membership
              plans are designed to cater to the varying needs of our clients,
              whether you are an individual or a business owner; Our plans come
              with a range of benefits, including access to our team of
              experienced tax professionals who can assist you with tax
              planning, preparation, and filing. We provide personalized service
              to ensure that you receive the attention you deserve, and we work
              diligently to help you achieve your financial goals. Services of
              the membership plans are currently available via email and the
              same will soon be made available over the portal.
            </p>
            {/* <div>Content here...</div> */}
          </div>
        </div>
      </div>
    </section>
    <div className="section-membership-img">
      <img
        className="section-membership-img-place"
        src={membership}
        alt="text"
      />
    </div>

    <br />
  </>
);

export default MembershipPage;
