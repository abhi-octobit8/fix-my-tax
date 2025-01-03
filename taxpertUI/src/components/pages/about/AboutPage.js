import React from "react";
import max_benefit from "../../../assets/img/max_benefit.png";
import upfront from "../../../assets/img/upfront.png";
import team from "../../../assets/img/about.png";
import promoter1 from "../../../assets/img/pawan_jaiswal.jpg";
import promoter2 from "../../../assets/img/nidhi_singh.PNG";
import "./AboutPage.css";
import { Col, Row } from "antd";
import SeoHeader from "../../../common/seo/SeoHeader";
import { TAGS } from "../../../shared/constant/Tags";
import { NavLink } from "react-router-dom";

const AboutPage = () => (
  <>
    <SeoHeader
      title={TAGS.about_us.title}
      description={TAGS.about_us.decription}
    />
    <section id="service-banner" className="section-banner">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="section-banner-info">
            <div className="section-banner-title">Our Mission</div>
            <p className="section-banner-data">
              At our <NavLink to="/"> Taxation consultancy firm </NavLink> , our
              mission is to provide unparalleled tax solutions and guidance to
              our clients, enabling them to make informed decisions and achieve
              their financial objectives. We believe that tax compliance is not
              just a legal obligation, but also an opportunity to optimize
              financial performance and minimize risks. Our team of highly
              skilled professionals strives to provide comprehensive tax
              services, tailored to meet the specific needs of each client. We
              are committed to staying up-to-date with the latest tax
              regulations, trends and strategies, so that we can deliver
              innovative and effective solutions that add value to our clients.
            </p>
            <p className="section-banner-data">
              We understand that taxation can be complex and overwhelming, which
              is why we are dedicated to providing clear, concise and timely
              communication with our clients. Our goal is to build long-lasting
              relationships with our clients, based on trust, integrity and
              mutual respect. We are passionate about helping our clients
              succeed and are committed to providing exceptional service and
              support throughout their journey.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="promoters-section">
      <div className="section-header">
        <h1>Our Founder And Promoters</h1>
        <hr className="taxpert-line" />
      </div>

      <div className="testimonial-containter">
        <div className="box">
          <img
            className="cover promoters-image"
            src={promoter1}
            alt="text"
            height={400}
            width={"auto"}
          />
          <div className="content">
            <div className="info">
              <div className="name">Dr. Pawan Jaiswal</div>
              <div>
                <span className="name">Qualifications: </span>{" "}
                <span className="job">
                  M.Com., Ph.D., M.B.A., F.C.M.A, M.I.MA., Ex.RP – MCA & SEBI,
                  F.I.V., CA(I) (Senior Tax & Cost Management Consultant).
                </span>
              </div>
            </div>
          </div>
          <p>
            Dr. Jaiswal has experience and expertise in the fields of Direct &
            Indirect Taxation, Financial Management, and Enterprise Start-up,
            spanning over three decades. He is also an approved valuer for
            Government Agencies and a member of various Government Policy-making
            Agencies. Rising from a humble background with the sole aspiration
            to simplify taxation complexities for the common man in India and
            across the globe, Dr. Jaiswal is not only a Tax & Finance Expert but
            also an avid speaker on the subject. He has delivered thousands of
            lectures on Government & Corporate platforms and is actively
            involved in social and philanthropic activities aimed at uplifting
            the poor and needy strata of society.
          </p>
          <br />
        </div>
        <div className="box">
          <img
            className="cover promoters-image"
            src={promoter2}
            alt="text"
            height={400}
            width={"auto"}
          />
          <div className="content">
            <div className="info">
              <div className="name">Smt. Nidhi Pawan Singh</div>
              <div>
                <span className="name">Qualifications: </span>{" "}
                <span className="job">MSc, LLB, MBA, A.M.I.M.A.</span>
              </div>
              <br />
            </div>
          </div>
          <p>
            Smt. Singh is a dynamic advocate representing the image of women's
            empowerment, with vast experience in the domain of law, specifically
            in Direct and Indirect Taxation, spanning a career of over two
            decades. She is also empaneled as a mediator at the Allahabad High
            Court Mediation and Conciliation Centre [AHCMCC]. Her areas of
            interest include Taxation, Business Management, and Mathematics.
            Along with her spouse, Dr. Pawan Jaiswal, she is also involved in
            philanthropic activities for the upliftment of the weaker sections
            of society. Belonging to a family of bureaucrats, her main forte is
            administration.
          </p>
        </div>
      </div>
    </section>
    <div className="section-1">
      <h6 className="sec-1-head">
        Your tax preparation comes with built in assurance
      </h6>

      <div>
        <Row>
          <Col lg={8} md={6} sm={24} xs={24} className="section-1-content">
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
              Our experts ensure that your tax filing is hassale free for
              availing maximum tax benefits on your income and also you enjoy
              spotless assessments
            </p>
          </Col>
          <Col lg={8} md={6} sm={24} xs={24} className="section-1-content">
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
              Our transparent approach means that we keep our clients informed
              and involved throughout the entire process, ensuring they have a
              clear understanding of their tax situation and the steps needed to
              achieve their financial goals. Trust us to provide you with expert
              advice and guidance in a straightforward and understandable
              manner.
            </p>
          </Col>
          <Col lg={8} md={6} sm={24} xs={24} className="section-1-content">
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
          </Col>
        </Row>
      </div>
    </div>
  </>
);

export default AboutPage;
