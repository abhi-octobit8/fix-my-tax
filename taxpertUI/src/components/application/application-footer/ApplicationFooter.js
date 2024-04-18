/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MENU_ITEMS_FOOTER_USEFUL_LINKS,
  MENU_ITEMS_SERVICE_FOOTER,
} from "./constant";
import "./ApplicationFooter.css";
import logo from "../../../assets/img/footer_logo2.png";

const displayName = "ApplicationFooter";

function ApplicationFooter() {
  const handleClick = (path) => {
    window.open(path, "_blank");
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-12 footer-info">
              <div style={{ display: "flex" }}>
                <img src={logo} alt="text" height={100} width={400} />
                {/* <a href="index.html" className="logo d-flex align-items-center">
                  <span>fixmytax</span>
                </a> */}
              </div>

              <p>
                We are here to solve all your tax related queries so that you
                may enjoy peace of mind.
              </p>
              <br />
              <p>Developed by XoQoVo Pvt. Ltd.</p>
              <div className="social-links d-flex  mt-3">
                <a href="#" className="twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                {MENU_ITEMS_FOOTER_USEFUL_LINKS.map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.to} target="_blank">
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Information</h4>
              <ul>
                {MENU_ITEMS_SERVICE_FOOTER.map((item, index) => {
                  if (item.file) {
                    return (
                      // eslint-disable-next-line react/jsx-no-comment-textnodes
                      <li key={index}>
                        {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid,
                        jsx-a11y/anchor-is-valid */}
                        <a onClick={() => handleClick(item.to)}>{item.label}</a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <NavLink to={item.to}>{item.label}</NavLink>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="col-lg-2 col-6 footer-contact  text-md-start">
              <h4>Registered Office</h4>

              <p>
                Karsathi Consultants Private Limited,
                <br /> Mukut Tower, 402, <br />
                Vikas Nagar, Sector - 2
                <br />
                Lucknow, UP - 226022
                <br />
              </p>
            </div>
            <div className="col-lg-2 col-6 footer-contact  text-md-start">
              <h4>Corporate Office</h4>
              <p>
                Sangam Place, U 20 & 26, <br />
                Civil Lines, Prayagraj,
                <br />
                U.P. - 211001
                <br />
                <strong>Available</strong> Monday to Friday: 10:00 am to 6:00 pm
                <br />
                <strong>Phone</strong> +91 6387022844
                <br />
                <strong>Email:</strong>contact@fixmytax.in
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

ApplicationFooter.displayName = displayName;

export default ApplicationFooter;
