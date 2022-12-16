import { Button, Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarOutlined, StarFilled } from "@ant-design/icons";

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
      <Row>
        <Col span="12">
          <Card title="ITR Notice" className="service-block">
            <div className="service-content">
              <span>
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus.
              </span>
            </div>
            <Button type="success">Know More >></Button>
          </Card>
        </Col>
        <Col span="12">
          <Card title="GST Notice" className="service-block">
            <div className="service-content">
              <span>
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus.
              </span>
            </div>
            <Button type="success">Know More >></Button>
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
    <section className="testimonial-value-section">
      <div className="section-header">
        <h1>Testimonial</h1>
        <hr className="taxpert-line" />
        <h4>Read What our Customer Say</h4>
      </div>
      <div className="testimonial-containter">
        <div className="box">
          <i className="fas fa-quote-left quote"></i>
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
          <i className="fas fa-quote-left quote"></i>
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
          <i className="fas fa-quote-left quote"></i>
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
  </React.Fragment>
);
export default HomePage;
