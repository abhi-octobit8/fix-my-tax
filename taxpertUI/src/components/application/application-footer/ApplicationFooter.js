import { Button, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

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
                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                nada terra videa magna derita valies darta donna mare fermentum
                iaculis eu non diam phasellus.
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
                <li>
                  <i className="bi bi-dash"></i> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <a href="#">About us</a>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <a href="#">Services</a>
                </li>
                <li>
                  <i className="bi bi-dash"></i>{" "}
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="bi bi-dash"></i> <a href="#">ITR Notice</a>
                </li>
                <li>
                  <i className="bi bi-dash"></i> <a href="#">GST Notice</a>
                </li>
                
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
              Mukut Tower, 402 <br />
                Vikas Nagar, Sector - 2
                <br />
                Lucknow, UP - 226022<br />
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
