import { Button, Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";
const HomePage = () => (
  // <div className="jumbotron">
  //   <h1>Sample Administration</h1>
  //   <p>React, Redux and React Router webapp</p>
  //   <Link to="about" className="btn btn-primary">
  //     Home
  //   </Link>
  // </div>
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
  </React.Fragment>
);
export default HomePage;
