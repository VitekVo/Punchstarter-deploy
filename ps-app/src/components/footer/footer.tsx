import React from "react";
import { GiPunch } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-white border-t p-4 flex gap-4 footer items-center justify-center mt-8">
      <GiPunch size={50} />
      <div className={"flex flex-col gap-0"}>
        <h3 className={"font-bold uppercase"}>PunchStarter</h3>
        <h3>Uppercutting projects since 2024</h3>
      </div>
    </footer>
  );
};

export default Footer;
