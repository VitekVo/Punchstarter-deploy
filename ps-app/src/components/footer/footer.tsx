import React from "react";
import { GiPunch } from "react-icons/gi";
import LinkButton from "../button/LinkButton";
const Footer = () => {
  return (
    <footer className="footer footer-center bg-white text-neutral-content p-10 border-t">
      <nav className="c text-black">
        <GiPunch size={50} />
        <p>
          PunchStarter
          <br />
          Uppercutting projects since 2024
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
