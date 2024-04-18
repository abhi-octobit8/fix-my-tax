import React from "react";
import {
  CheckCircleFilled,
  YoutubeFilled,
  TwitterOutlined,
  FacebookFilled,
  LinkedinOutlined,
} from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Card, Col, Row } from "antd";
import card1 from "../../../assets/img/card1.svg";
import card2 from "../../../assets/img/card2.svg";
import card3 from "../../../assets/img/card3.svg";
import about from "../../../assets/img/team.jpg";
import { AuthorizedIcon, SafeSecureIcon } from "../../../common/icons/icons";
import logo1 from "../../../assets/img/sahab.png";
import { PATH } from "../../../shared/Route";
import useRedirectPath from "../../hooks/useRedirectPath";
import SeoHeader from "../../../common/seo/SeoHeader";
import { TAGS } from "../../../shared/constant/Tags";

import "./HomePage.css";
import { NavLink } from "react-router-dom";

function HomePage() {
  const navigator = useRedirectPath();

  const handleClick = (path) => {
    window.open(path, "_blank");
  };

  return (
    <React.Fragment>
      <SeoHeader title={TAGS.home.title} description={TAGS.home.decription} />
      <section id="banner-to-action" className="banner-to-action">
        <div className="container" data-aos="fade-up">
          <div className="row ">
            <div className="col-lg-6 banner-section-content ">
              <h1>FixMyTax, where Precision meets Peace of mind</h1>
              <h6> What We Do</h6>
              <ul>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Income Tax &{" "}
                  <NavLink to="/service/gst-return">GST Return Filing </NavLink>
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Facilitate Tax Payment of{" "}
                  <NavLink to="/service/tax-appeal"> Income Tax & GST </NavLink>
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Preparation & Filing of Reply Petitions for Assessments of
                  Income Tax & GST
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Drafting of Written Submission & Filing of First Appeal
                  [Income Tax & GST]
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Drafting of Written Submission & Filing of Second Appeal
                  [Income Tax & GST]
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  <NavLink to="/service/video-consultation">
                    {" "}
                    Video Conferencing Facility
                  </NavLink>
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Appearance on behalf of Assessee
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Business Decisions Consultancy
                </li>
                <li>
                  <CheckCircleFilled
                    style={{ fontSize: "16px", color: "#f47c01" }}
                  />{" "}
                  Provide Answers to your Notices & Queries
                </li>
              </ul>
            </div>
            <div className="col-lg-6 banner-image">
              <LazyLoadImage
                className="cover"
                src={logo1}
                alt="text"
                height={"auto"}
                width={400}
              />
              <div>
                <h6>
                  {" "}
                  A Creative Genius of Tax Wizard CMA Vr. Dr. Pawan Jaiswal
                </h6>
                <div style={{ textAlign: "right" }}>
                  <YoutubeFilled
                    className="brand-icon"
                    onClick={() =>
                      handleClick("https://youtube.com/@DrPawanJaiswal")
                    }
                  />
                  <FacebookFilled
                    className="brand-icon"
                    onClick={() =>
                      handleClick(
                        "https://www.facebook.com/urtaxguide?mibextid=ZbWKwL"
                      )
                    }
                  />
                  <TwitterOutlined
                    className="brand-icon"
                    onClick={() =>
                      handleClick(
                        "https://twitter.com/drpawanjaiswal?t=nXu3RRQD-B0IDUQJtN-z4g&s=08"
                      )
                    }
                  />
                  <LinkedinOutlined
                    className="brand-icon last"
                    onClick={() =>
                      handleClick("https://www.linkedin.com/in/drpawanjaiswal")
                    }
                  />
                </div>
              </div>
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
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_ITR_FILING)}
            >
              ITR Filing
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_TDS_TCS_FILING)}
            >
              TDS/TCS Filing
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.ITR_NOTICE_PATH)}
            >
              ITR/TDS/TCS
              <br />
              Notices
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_GST_RETURN)}
            >
              GST Return
            </Button>
          </Col>
        </Row>
        <Row className="button-container">
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.GST_NOTICE)}
            >
              GST Notice
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_TAX_APPEAL)}
            >
              Income Tax/
              <br />
              GST Appeals
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_BUSINESS_CONSULTATION)}
            >
              Business
              <br />
              Consultation
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_VIDEO_CONSULTATION)}
            >
              Video
              <br />
              Consultation
            </Button>
          </Col>
        </Row>
      </div>

      {/* about section */}

      {/* <Row className="about-company-section">
        <Col xs={24} md={8} lg={8} sm={24} className="about-company-container">
          <h1>About our Company</h1>
          <p className="about-company-content">
            Our team comprises of CMA's, CA's, CS's, Taxation Lawyers and
            Subject Experts to resolve your taxation / business related queries.
          </p>
        </Col>
        <Col xs={24} md={16} lg={16} sm={24}>
          <span>
            <LazyLoadImage
              className="cover"
              src={about}
              alt="about"
              width="100%"
              height="400px"
            />
          </span>
        </Col>
      </Row> */}
      <section className="about-section">
        <div className="section-header">
          <h1>fixmytax</h1>
          <hr className="taxpert-line" />
        </div>
        <div className="container">
          <div className="outer">
            <div>
              <p style={{ textAlign: "justify" }}>
                We're a seasoned team of taxation and consulting experts,
                including CMAs, CAs, CSs, Taxation Lawyers, and Subject Experts,
                ready to tackle your business and taxation queries head-on. With
                our cutting-edge technology, our services are accessible round
                the clock on our portal. Whether you're an individual or a
                professional in the taxation or accounting fields, we're here to
                provide expert guidance and support. Stay updated, stay covered
                - we're available 24/7 to assist with all matters related to
                direct and indirect tax issues.
              </p>
            </div>
          </div>
        </div>
      </section>
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
                  <h3 className="service-sub-header-title">
                    For Professionals
                  </h3>
                  <p className="card-text">
                    Expert Advisory services for your clients related to
                    taxation and enterprise set-up.
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
                    Get rid of your financial taxation and accounting nuisance
                    with us.
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* <section className="about-section">
        <div className="container">
          <div className="outer">
            <div className="left">
              <div className="heading">
                <span>fixmytax</span>
              </div>
              <p style={{ textAlign: "justify" }}>
                We are a strong team of experts with wide experience in the
                field of taxation and consulting. Armed with latest technology
                we have established “fixmytax.in” a portal where our expert
                services are available round the clock for our clients. We aim
                to provide expert advice not only to individuals but also to
                professionals from taxation and accountancy field like CA’s, CS,
                Accountants, Government Consultants etc. Armed with technology,
                we as a team are updated, experienced and available to our
                clients 24*7 to address all matters related to notices for both
                direct as well as indirect tax related matters.
              </p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <SafeSecureIcon className="icon" />
                  Secure and safe
                </li>

                <li>
                  <AuthorizedIcon className={"icon"} />
                  Registered with DPIIT & Start in UP
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
    </React.Fragment>
  );
}
export default HomePage;
