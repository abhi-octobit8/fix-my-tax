import { Button, Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import card1 from "../../../assets/img/card1.svg";
import card2 from "../../../assets/img/card2.svg";
import card3 from "../../../assets/img/card3.svg";
import about from "../../../assets/img/about.png";

import "./HomePage.css";
import {
  AuthorizedIcon,
  RatingIcon,
  SafeSecureIcon,
  TrustedUserIcon,
} from "../../../common/icons/icons";
import xocovoPartner from "../../../assets/img/xocovo.png";
import smartPartner from "../../../assets/img/smartpartner.png";
import medimaaPartner from "../../../assets/img/medimaa.png";
import xocovoPartner1 from "../../../assets/img/xocovo.png";

const HomePage = () => (
  <React.Fragment>
    <section id="banner-to-action" className="banner-to-action">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h2>
              {" "}
              Get Peace of mind Knowing that your taxes are handled by Experts.
            </h2>
            {/* <p>
            Get Peace of mind Knowing that your taxes are handled by Experts.
          </p> */}
            {/* <a className="cta-btn" href="#">
            start here
          </a> */}
            <Button type="primary" size="large" className="cta-btn">
              Start Here
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="service-section">
      <div className="section-header">
        <h1>Got A Notice?</h1>
        <hr className="taxpert-line" />
      </div>
      <div className="about-section">
        <h1>About our Company</h1>
        <div className="about-wrap">
          <p>
            A team comprised of CMA's, CA's, Taxation Lawyers and subject
            experts available 24*7 to resolve taxation related queries.
          </p>
          <span>
            <img src={about} alt="about-image" width="950px" height="300px" />
          </span>
        </div>
      </div>
      <h1 className="service-head">Our Services</h1>

      <div className="service-cards">
        {/* <div className="our-services-sec"> */}
        <div className="card-wrap">
          <div className="card" style={{ width: "18 rem" }}>
            <img src={card1} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">For Individuals</h5>
              <p className="card-text">
                Taxation filing Services, Tax Notices reply and resolution
                Services, Enterprise and Business consultancy.
              </p>
            </div>
          </div>
          <div className="card" style={{ width: "18 rem" }}>
            <img src={card2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">For Professionals</h5>
              <p className="card-text">
                Expert Advisory services for your clients related to taxation
                and enterprise set-up.
              </p>
            </div>
          </div>
          <div className="card" style={{ width: "18 rem" }}>
            <img src={card3} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">For Businesses</h5>
              <p className="card-text">
                Get rid of your business' taxation and accounting headaches with
                us.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <Row>
        <Col xs={24} md={12} lg={12} sm={24}>
          <Card title="ITR Notice" className="service-block">
            <div className="service-content">
              <span>
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus.
              </span>
            </div>
            <Button type="success">Know More </Button>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12} sm={24}>
          <Card title="GST Notice" className="service-block">
            <div className="service-content">
              <span>
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus.
              </span>
            </div>
            <Button type="success">Know More </Button>
          </Card>
        </Col>
      </Row>
    </section>
    <section className="about-section">
      <div className="container">
        <div className="outer">
          <div className="left">
            <div className="heading">
              <span>FixMyTax</span>
            </div>
            <h3>Best Tax expert website in India</h3>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
              nada terra videa magna derita valies darta donna mare fermentum
              iaculis eu non diam phasellus.
            </p>
            <Button type="primary">Read More</Button>
          </div>
          <div className="right">
            <ul>
              <li>
                <SafeSecureIcon className="icon" />
                Secure and safe
              </li>
              <li>
                <RatingIcon className={"icon"} />
                4.5 Star Service Rating{" "}
              </li>
              <li>
                <TrustedUserIcon className={"icon"} />
                Trusted by 5000+ users
              </li>
              <li>
                <AuthorizedIcon className={"icon"} />
                Authorized by Income Tax Department
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="testimonial-value-section">
      <div className="section-header">
        <h1>Testimonial</h1>
        <hr className="taxpert-line" />
        <h4>Read What our Customer Say</h4>
      </div>
      <div className="testimonial-videos">
        <iframe
          width="596"
          height="335"
          src="https://www.youtube.com/embed/84R6m0Zj-Dc"
          title="How to Avoid Tax on Profit Gained at Selling a House or Property ??"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <iframe id="video2"
          width="596"
          height="335"
          src="https://www.youtube.com/embed/UZRIObmTSjg"
          title="Company, It's Types and Registration"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="testimonial-containter">
        <div className="box">
          <p>
            Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
            elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
            repellendus repudiandae deleniti ideas fuga molestiae, alias.
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Smith</div>
              <div className="job">Advocate</div>
              <div className="stars">
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <p>
            Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
            elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
            repellendus repudiandae deleniti ideas fuga molestiae, alias.
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Smith</div>
              <div className="job">Advocate</div>
              <div className="stars">
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <p>
            Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
            elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
            repellendus repudiandae deleniti ideas fuga molestiae, alias.
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Alex Smith</div>
              <div className="job">Advocate</div>
              <div className="stars">
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarFilled style={{ color: "#17a2b8" }} />
                <StarOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="our-value-section">
      <div className="section-header">
        <h1>Our Value Partner</h1>
        <hr className="taxpert-line" />
      </div>
      <div className="container">
        <ul>
          <li>
            <img src={xocovoPartner} width={135} height={45} />
          </li>
          <li>
            <img src={smartPartner} width={135} height={45} />
          </li>
          <li>
            <img src={medimaaPartner} width={135} height={45} />
          </li>
          <li>
            <img src={xocovoPartner1} width={135} height={45} />
          </li>
        </ul>
      </div>
    </section>
  </React.Fragment>
);
export default HomePage;
