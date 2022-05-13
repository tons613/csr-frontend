import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Logo from "assets/img/Total.png";

export default function DefaultNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="transparent" className="bg-[#E6E6E6] mt-10" navbar>
      <NavbarContainer
        className="bg-[#F1A83B]"
        color="purple"
        // style={{
        //   backgroundColor: "rgb(250,250,250,.4",
        //   height: 100,
        //   marginTop: 20,
        //   paddingTop: 10,
        //   marginBottom: 100,
        // }}
      >
        <NavbarWrapper>
          <a
            href="https://material-tailwind.com?ref=mtk"
            target="_blank"
            rel="noreferrer"
          >
            <NavbarBrand>
              <img src={Logo} className="bg-white" />
            </NavbarBrand>
          </a>
          <NavbarToggler
            onClick={() => setOpenNavbar(!openNavbar)}
            color="white"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav>
            <div className="flex flex-col z-50 lg:flex-row lg:items-center">
              <NavLink
                href="https://github.com/creativetimofficial/material-tailwind?ref=mtk"
                target="_blank"
                rel="noreferrer"
                ripple="light"
              >
                <Icon family="font-awesome" name="fab fa-github" size="xl" />
                &nbsp;Home
              </NavLink>

              <NavLink href="#" ripple="light">
                <Icon family="font-awesome" name="fab fa-github" size="xl" />
                &nbsp;Scholarships
              </NavLink>

              <NavLink href="#" ripple="light">
                <Icon family="font-awesome" name="fab fa-github" size="xl" />
                &nbsp;Notice
              </NavLink>
              <NavLink href="#" rel="noreferrer" ripple="light">
                Contact
              </NavLink>
              <NavLink href="#" ripple="light">
                <Link to="/auth/login" color="white">
                  Login
                </Link>
              </NavLink>
              {/* <Link to="/auth/login" color="white">
                <Button
                  color="transparent"
                  className="bg-white text-black ml-4"
                  ripple="dark"
                >
                  Login
                </Button>
              </Link> */}
            </div>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}
