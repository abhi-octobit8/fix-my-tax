import React from "react";
import "./ContactUs.css";

const ContactUs = () => (
  <>
    <h3 className="top-head">Contact Us</h3>
    <div className="contact-page">
      <div className="part-1">
        <form className="input-field">
          Enter First Name
          <br />
          <input type="text" />
          <br />
          Enter Last Name
          <br />
          <input type="text" />
          <br />
          Email
          <br />
          <input type="email" />
          <br />
          Phone
          <br />
          <input type="phone" />
          <br />
          Query
          <br />
          <input type="text" id="query" />
          <br />
          <button type="submit" className="sm-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="part-2">
        <div className="part-2-edit">
          <br/>
          <h6 style={{ fontSize: "20px" }}>We are here to help</h6>
          <img
            src="https://thumbs.dreamstime.com/b/blue-location-icon-isolated-white-background-blue-location-icon-118971017.jpg"
            alt="location icon"
            width="40px"
            height="40px"
          />
          <span style={{ marginLeft: "9px" }}>
            Mukut Tower, 402 Vikas Nagar, Sector - 2, Lucknow, UP - 226022
          </span>
          <br />
          <img
            src="https://media.istockphoto.com/id/1218145182/vector/blue-phone-icon-symbol-in-trendy-flat-style-isolated-on-white-background-telephone-logo-and.jpg?s=170667a&w=0&k=20&c=fRGLeIX_unLtmu7MvCHBnP2CPFhiTu1GxoWDq31683g="
            alt="location icon"
            width="40px"
            height="55px"
          />
          <span style={{ marginLeft: "8px" }}>+91 9839441144</span>
          <br />
          <img
            src="https://www.seekpng.com/png/small/0-9454_mail-icon-png-white-circle-dash-coin-logo.png"
            alt="location icon"
            width="40px"
            height="40px"
          />
          <span style={{ marginLeft: "11px" }}>contact@fixmytax.in</span>
          <br />
        </div>
      </div>
    </div>
  </>
);
export default ContactUs;
