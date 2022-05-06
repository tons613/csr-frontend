import { useState } from "react";
// import { Link } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import Logo from "assets/img/logo.png";
// import Image from "@material-tailwind/react/Image";

export default function AuthNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="teal" navbar className="bg-white1">
      <NavbarContainer>
        <NavbarWrapper>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="lg:invisible1"
          >
            <NavbarBrand>
              <img src={Logo} style={{ width: 80 }} />
            </NavbarBrand>
          </a>
          {/* <NavbarToggler
            onClick={() => setOpenNavbar(!openNavbar)}
            color="white"
          /> */}
          <div className="md:pt-5 lg:ml-10 float-right">
            <h3
              className="uppercase text-orange-8001 text-white text-lg tracking-wider"
              style={{ alignSelf: "flex-start" }}
            >
              Total National Merit Scholarship Award.
            </h3>
          </div>
        </NavbarWrapper>
      </NavbarContainer>
    </Navbar>
  );
}
