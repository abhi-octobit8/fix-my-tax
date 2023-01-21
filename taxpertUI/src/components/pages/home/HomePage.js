import { Button, Card, Col, Row, Space } from "antd";
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
import logo1 from "../../../assets/img/banner2.png";
import xocovoPartner from "../../../assets/img/xocovo.png";
import smartPartner from "../../../assets/img/smartpartner.png";
import medimaaPartner from "../../../assets/img/medimaa.png";
import xocovoPartner1 from "../../../assets/img/xocovo.png";

const HomePage = () => (
  <React.Fragment>
    <section id="banner-to-action" className="banner-to-action">
      <div className="container" data-aos="fade-up">
        <div className="row ">
          <div className="col-lg-6 banner-section-content ">
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
            <Button type="primary" className="button-style-middle">
              Start Here
            </Button>
          </div>
          <div className="col-lg-6 banner-image">
            <img
              className="cover"
              src={logo1}
              alt="text"
              height={400}
              width={400}
            />
            {/* <p>
            Get Peace of mind Knowing that your taxes are handled by Experts.
          </p> */}
            {/* <a className="cta-btn" href="#">
            start here
          </a> */}
          </div>
        </div>
      </div>
    </section>
    <div className="got-a-notice-section">
      <div className="section-header">
        <h1>Got A Notice?</h1>
        <hr className="taxpert-line" />
      </div>
      <Row className="button-container">
        <Col xs={24} md={8} lg={8} sm={24}>
          <Button className="button-style" type="primary">
            ITR Notice
          </Button>
        </Col>
        <Col xs={24} md={8} lg={8} sm={24}>
          <Button className="button-style" type="primary">
            GST Notice
          </Button>
        </Col>
        <Col xs={24} md={8} lg={8} sm={24}>
          <Button className="button-style" type="primary">
            Consultation
          </Button>
        </Col>
      </Row>
    </div>

    {/* about section */}

    <Row className="about-company-section">
      <Col xs={24} md={12} lg={12} sm={24} className="about-company-container">
        <h1>About our Company</h1>
        <p className="about-company-content">
          A team comprised of CMA's, CA's, Taxation Lawyers and subject experts
          available 24*7 to resolve taxation related queries.
        </p>
      </Col>
      <Col xs={24} md={12} lg={12} sm={24}>
        <span>
          <img
            className="cover"
            src={about}
            alt="about-image"
            width="100%"
            height="500px"
          />
        </span>
      </Col>
    </Row>
    {/* // service section */}
    <div className="service-section">
      <div className="section-header">
        <h1>Our Services</h1>
        <hr className="taxpert-line" />
      </div>
      <Row>
        <Col xs={24} md={8} lg={8} sm={24}>
          <Card className="service-block">
            <div>
              <img
                src={card1}
                width="200"
                height={200}
                className="card-img-top"
                alt="..."
              />
              <div>
                <h3 className="service-sub-header-title">For Individuals</h3>
                <p className="card-text">
                  Taxation filing Services, Tax Notices reply and resolution
                  Services, Enterprise and Business consultancy.
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8} lg={8} sm={24}>
          <Card className="service-block">
            <div>
              <img
                src={card2}
                width="200"
                height={200}
                className="card-img-top"
                alt="..."
              />
              <div>
                <h3 className="service-sub-header-title">For Professionals</h3>
                <p className="card-text">
                  Expert Advisory services for your clients related to taxation
                  and enterprise set-up.
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8} lg={8} sm={24}>
          <Card className="service-block">
            <div>
              <img
                src={card3}
                width="200"
                height={200}
                className="card-img-top"
                alt="..."
              />
              <div>
                <h3 className="service-sub-header-title">For Businesses</h3>
                <p className="card-text">
                  Get rid of your business' taxation and accounting headaches
                  with us.
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

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
      <div class="video-section">
        <div class="videos first-video">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="https://www.youtube.com/embed/84R6m0Zj-Dc"
          ></iframe>
        </div>

        <div class="videos second-video">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="https://www.youtube.com/embed/UZRIObmTSjg"
          ></iframe>
        </div>
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
