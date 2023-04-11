import React from "react";
import {
  StarOutlined,
  StarFilled,
  CheckCircleFilled,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import card1 from "../../../assets/img/card1.svg";
import card2 from "../../../assets/img/card2.svg";
import card3 from "../../../assets/img/card3.svg";
import about from "../../../assets/img/team.jpg";
import {
  AuthorizedIcon,
  RatingIcon,
  SafeSecureIcon,
  TrustedUserIcon,
} from "../../../common/icons/icons";
import logo1 from "../../../assets/img/sahab.png";
import promoter1 from "../../../assets/img/pawan_jaiswal.PNG";
import promoter2 from "../../../assets/img/nidhi_singh.PNG";
// import xocovoPartner from "../../../assets/img/xocovo.png";
// import smartPartner from "../../../assets/img/smartpartner.png";
// import medimaaPartner from "../../../assets/img/medimaa.png";
// import xocovoPartner1 from "../../../assets/img/zupier.jpeg";
import { PATH } from "../../../shared/Route";
import useRedirectPath from "../../hooks/useRedirectPath";

import "./HomePage.css";

const items = [
  { id: 1, value: "Income Tax & GST Return Filing" },
  { id: 2, value: "Facilitate Tax Payment of Income Tax & GST" },
  {
    id: 3,
    value:
      "Preparation & Filing of Reply Petitions for Assessments of Income Tax & GST",
  },
  {
    id: 4,
    value:
      "Drafting of Written Submission & Filing of First Appeal [Income Tax & GST]",
  },
  {
    id: 5,
    value:
      "Drafting of Written Submission & Filing of Second Appeal [Income Tax & GST]",
  },
  {
    id: 6,
    value: "Video Conferencing Facility",
  },
  {
    id: 7,
    value: "Appearance on behalf of Assessee",
  },
  {
    id: 8,
    value: "Business Decisions Consultancy",
  },
  {
    id: 9,
    value: "Provide Answers to your Notices & Queries",
  },
];

function HomePage() {
  const navigator = useRedirectPath();

  return (
    <React.Fragment>
      <section id="banner-to-action" className="banner-to-action">
        <div className="container" data-aos="fade-up">
          <div className="row ">
            <div className="col-lg-6 banner-section-content ">
              <h2> We will manage your taxes, you enjoy life.</h2>
              <h6> What We Do</h6>
              <ul>
                {items.map((item, index) => {
                  return (
                    <>
                      <li>
                        {" "}
                        {/* <CheckCircleTwoTone twoToneColor="#f47c01" />{" "} */}
                        <CheckCircleFilled
                          style={{ fontSize: "16px", color: "#f47c01" }}
                        />{" "}
                        {item.value}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-6 banner-image">
              <img
                className="cover"
                src={logo1}
                alt="text"
                height={400}
                width={400}
              />
              <h6>
                {" "}
                A Creative Genius of Tax Wizard CMA Vr. Dr. Pawan Jaiswal
              </h6>
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
              onClick={() => navigator.goTo(PATH.SERVICE_FILING)}
            >
              Filing
              <br />
              ITR/TCS/TDS
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
              alt="about"
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
              {/* <h3>Best Tax expert website in India</h3> */}
              <p>
                We are a strong team of experts with vide experience in the
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
              {/* <Button type="primary">Read More</Button> */}
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
                  Registered with DPIIT & Start in UP
                </li>
              </ul>
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
              width={400}
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
              Dr. Jaiswal is having experience and expertise in the field of
              Direct & Indirect Taxation, Financial Management and Enterprise
              Start-up for a career spanning over 3 decades. He is also approved
              valuer for Government Agencies and member of various Government
              Policy making Agencies. Rising from a humble back-ground with the
              sole aspiration to ease the complicities of taxation for common
              man in India and across the globe. Besides being a Tax & Finance
              Expert, he is also an avid speaker on the subject delivering
              thousands on lecturers on Government & Corporate platforms and
              actively involved in social and philanthropic activities for the
              upliftment of poor and needy strata of the society.
            </p>
            <br />
            {/* <div className="content">
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
            </div> */}
          </div>
          <div className="box">
            <img
              className="cover promoters-image"
              src={promoter2}
              alt="text"
              height={400}
              width={400}
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
              Smt. Singh is a dynamic Advocate representing the image of women
              empowerment having vast experience in the domain of law
              specifically [Direct & Indirect Taxation] for a career spanning
              over 2 decades. She is also Empanelled as Mediator of Allahabad
              High Court Mediation and Conciliation Centre [AHCMCC]. Her areas
              of work interest include Taxation, Business Management and
              Mathematics. Along-with her husband Dr. Pawan Jaiswal she is also
              involved in silent philanthropic activities for upliftment of
              weaker section of society. Belonging to a family of bureaucrats;
              her main forte is administration.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="testimonial-value-section">
        <div className="section-header">
          <h1>Testimonial</h1>
          <hr className="taxpert-line" />
          <h4>Read What Our Customers Say</h4>
        </div>
        <div className="video-section">
          <div className="videos first-video">
            <iframe
              title="video"
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.youtube.com/embed/84R6m0Zj-Dc"
            ></iframe>
          </div>

          <div className="videos second-video">
            <iframe
              title="video"
              width="100%"
              height="100%"
              frameBorder="0"
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
      </section> */}
      {/* <section className="our-value-section">
        <div className="section-header">
          <h1>Our Value Partner</h1>
          <hr className="taxpert-line" />
        </div>
        <div className="container">
          <ul>
            <li>
              <img src={xocovoPartner} width={135} height={45} alt="logo" />
            </li>
            <li>
              <img src={smartPartner} width={135} height={45} alt="logo" />
            </li>
            <li>
              <img src={medimaaPartner} width={135} height={45} alt="logo" />
            </li>
            <li>
              <img src={xocovoPartner1} width={135} height={45} alt="logo" />
            </li>
          </ul>
        </div>
      </section> */}
    </React.Fragment>
  );
}
export default HomePage;
