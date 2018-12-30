import React from "react";

import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark footer">
      <h6>Copyright &copy; 2015 - {new Date().getFullYear()} SoftArs</h6>
    </footer>
  );
};

export default Footer;
