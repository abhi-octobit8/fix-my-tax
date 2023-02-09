import { Button, Card, Col, Row, Space } from "antd";
import React from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import card1 from "../../../assets/img/card1.svg";
import card2 from "../../../assets/img/card2.svg";
import card3 from "../../../assets/img/card3.svg";
import about from "../../../assets/img/about.jpeg";

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
import { PATH } from "../../../shared/Route";
import useRedirectPath from "../../hooks/useRedirectPath";

function HomePage() {
  const navigator = useRedirectPath();

  return (
    <React.Fragment>
      <section id="banner-to-action" className="banner-to-action">
        <div className="container" data-aos="fade-up">
          <div className="row ">
            <div className="col-lg-6 banner-section-content ">
              <h2> We will manage your Taxes, you enojoy Life.</h2>

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
              onClick={() => navigator.goTo(PATH.ITR_NOTICE_PATH)}
            >
              ITR Notice
            </Button>
          </Col>
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
              onClick={() => navigator.goTo(PATH.SERVICE_COSULTATION)}
            >
              Consultation
            </Button>
          </Col>
          <Col xs={24} md={6} lg={6} sm={24}>
            <Button
              className="button-style"
              type="primary"
              onClick={() => navigator.goTo(PATH.SERVICE_COSULTATION)}
            >
              FILING ITR/TCS
            </Button>
          </Col>
        </Row>
      </div>

      {/* about section */}

      <Row className="about-company-section">
        <Col xs={24} md={8} lg={8} sm={24} className="about-company-container">
          <h1>About our Company</h1>
          <p className="about-company-content">
            Our team comprises of CMA's, CA's, Taxation Lawyers and subject
            experts available 24*7 to resolve taxation related queries.
          </p>
        </Col>
        <Col xs={24} md={16} lg={16} sm={24}>
          <span>
            <img
              className="cover"
              src={about}
              alt="about-image"
              width="100%"
              height="400px"
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

      <section className="about-section">
        <div className="container">
          <div className="outer">
            <div className="left">
              <div className="heading">
                <span>fixmytax</span>
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
              Promoters of fixmytax proved to be a saviour during my crisis;
              their experts were quick, compassionate, and professional. Cannot
              ask for more. Their timely guidance helped to get all my statutory
              compliances in time.
            </p>
            <div className="content">
              <div className="info">
                <div className="name">Naveen Kesarwani</div>
                <div className="job">Industrialist</div>
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
              Your consultants are very prompt and intensive in their response
              which helped me to file my ITRs conveniently and smoothly.
            </p>
            <br />
            <div className="content">
              <div className="info">
                <div className="name">Subhas Chandra Dubey</div>
                <div className="job">IPS</div>
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
              Outstanding customer service from promoters of fixmytax. Right
              from the time of filing of return and completion of assessment
              proceedings. Everything was well taken care off. All the best for
              all their good work.
            </p>
            <div className="content">
              <div className="info">
                <div className="name">Dr. Ram Kumar Mishra</div>
                <div className="job">CMA, CS</div>
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
}
export default HomePage;
