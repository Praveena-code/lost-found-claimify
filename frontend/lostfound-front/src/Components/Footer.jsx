import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import "../Styles/StudentMenu.css";   // IMPORTANT: reuse same CSS

const Footer = () => {
  return (
    <footer className="student-footer">
      <div className="footer-brand">
        Claimify – Campus Lost &amp; Found
      </div>

      <div className="footer-cols">
        <div className="footer-col">
          <div className="footer-heading">Product</div>
          <div className="footer-link">Features</div>
          <div className="footer-link">How it works?</div>
          <div className="footer-link">Pricing</div>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Support</div>
          <div className="footer-link">Help &amp; FAQ</div>
          <div className="footer-link">Contact</div>
          <div className="footer-link">Report a problem</div>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Campus</div>
          <div className="footer-link">About this project</div>
          <div className="footer-link">Team</div>
          <div className="footer-link">Privacy &amp; Terms</div>
        </div>
      </div>

      <div className="footer-social">
        <div className="social-square"><FaFacebookF /></div>
        <div className="social-square"><FaLinkedinIn /></div>
        <div className="social-square"><FaYoutube /></div>
        <div className="social-square"><FaInstagram /></div>
      </div>
    </footer>
  );
};

export default Footer;
