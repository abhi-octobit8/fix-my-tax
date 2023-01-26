import { Button, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MENU_ITEMS_FOOTER_USEFUL_LINKS,
  MENU_ITEMS_SERVICE_FOOTER,
} from "./constant";
import "./ApplicationFooter.css";

const displayName = "ApplicationFooter";

function ApplicationFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <span>FixMyTax</span>
              </a>
              <p>
                Leave your taxation worries to us, so you can focus on growing
                your business.
              </p>
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
                  return (
                    <li key={index}>
                      <NavLink to={item.to}>{item.label}</NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                Mukut Tower, 402 <br />
                Vikas Nagar, Sector - 2
                <br />
                Lucknow, UP - 226022
                <br />
                <br />
                <strong>Phone:</strong> +91 9839441144
                <br />
                <strong>Email:</strong> contact@fixmytax.in
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
