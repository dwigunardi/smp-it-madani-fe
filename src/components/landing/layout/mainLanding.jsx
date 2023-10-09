import React from "react";
import { Container } from "react-bootstrap";
import FooterLanding from "./footer";
import NavbarLanding from "./navbar";

function MainLanding({ children }) {
  return (
    <div>
      <NavbarLanding />
      {children}
      <FooterLanding />
    </div>
  );
}

export default MainLanding;
