import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from "./Navbars/AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import Logo from "assets/img/logo.png";
import Image from "@material-tailwind/react/Image";
import { connect } from "react-redux";

function Sidebar(props) {
  const { currentUser } = props.auth;
  console.log(currentUser.registrationStatus);
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div
        style={{
          background: "linear-gradient(to bottom, #003333 0%, #ff9900 100%)",
        }}
        className={`h-screen fixed  md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div
          className={`bg-gray-200 fixed top-0 md:left-0 -ml-8 md:-ml-0 rigth-0 w-64  py-2 pl-10 flex-wrap overflow-hidden `}
        >
          <Image src={Logo} />
        </div>
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {/*<li className="rounded-lg mb-4">*/}
              {/*    <NavLink*/}
              {/*        to="/"*/}
              {/*        exact*/}
              {/*        className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"*/}
              {/*        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"*/}
              {/*    >*/}
              {/*        <Icon name="dashboard" size="2xl" />*/}
              {/*        Dashboard*/}
              {/*    </NavLink>*/}
              {/*</li>*/}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/dashboard/Application"
                  className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-orange-500 to-deep-orange-700 text-white shadow-md"
                >
                  <Icon name="list_alt" size="2xl" />
                  {/*<Icon name="settings" size="2xl" />*/}
                  My Application
                </NavLink>
              </li>

              {currentUser.registrationStatus === 3 && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    to="/dashboard/examSlip"
                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                    activeClassName="bg-gradient-to-tr from-orange-500 to-deep-orange-700 text-white shadow-md"
                  >
                    <Icon name="toc" size="2xl" />
                    Print Slip
                  </NavLink>
                </li>
              )}
              {currentUser.registrationStatus === 6 && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    to="/dashboard/examSlip"
                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                    activeClassName="bg-gradient-to-tr from-orange-500 to-deep-orange-700 text-white shadow-md"
                  >
                    <Icon name="toc" size="2xl" />
                    Bank Account
                  </NavLink>
                </li>
              )}
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/auth/login"
                  className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-orange-500 to-deep-orange-700 text-white shadow-md"
                >
                  <Icon name="fingerprint" size="2xl" />
                  Change Password
                </NavLink>
              </li>
              {/*<li className="rounded-lg mb-2 text-gray-700">*/}
              {/*    <NavLink*/}
              {/*        to="/login"*/}
              {/*        className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"*/}
              {/*        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"*/}
              {/*    >*/}
              {/*        <Icon name="map" size="2xl" />*/}
              {/*        Maps*/}
              {/*    </NavLink>*/}
              {/*</li>*/}
              {/*<li className="px-4 rounded-lg mb-2 text-gray-700">*/}
              {/*    <a*/}
              {/*        href="https://demos.creative-tim.com/material-tailwind-kit-react/#/register"*/}
              {/*        target="_blank"*/}
              {/*        rel="noreferrer"*/}
              {/*        className="flex items-center gap-4 text-sm font-light py-3"*/}
              {/*    >*/}
              {/*        <Icon name="list_alt" size="2xl" />*/}
              {/*        Register*/}
              {/*    </a>*/}
              {/*</li>*/}
              {/*<li className="px-4 rounded-lg mb-2 text-gray-700">*/}
              {/*    <a*/}
              {/*        href="https://demos.creative-tim.com/material-tailwind-kit-react/#/landing"*/}
              {/*        target="_blank"*/}
              {/*        rel="noreferrer"*/}
              {/*        className="flex items-center gap-4 text-sm font-light py-3"*/}
              {/*    >*/}
              {/*        <Icon name="web" size="2xl" />*/}
              {/*        Landing Page*/}
              {/*    </a>*/}
              {/*</li>*/}
              {/*<li className="px-4 rounded-lg mb-2 text-gray-700">*/}
              {/*    <a*/}
              {/*        href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"*/}
              {/*        target="_blank"*/}
              {/*        rel="noreferrer"*/}
              {/*        className="flex items-center gap-4 text-sm font-light py-3"*/}
              {/*    >*/}
              {/*        <Icon name="account_circle" size="2xl" />*/}
              {/*        Profile Page*/}
              {/*    </a>*/}
              {/*</li>*/}
            </ul>

            {/*<ul className="flex-col min-w-full flex list-none absolute bottom-0">*/}
            {/*    <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">*/}
            {/*        <a*/}
            {/*            href="https://material-tailwind.com/documentation/quick-start"*/}
            {/*            target="_blank"*/}
            {/*            rel="noreferrer"*/}
            {/*            className="flex items-center gap-4 text-sm font-light py-3"*/}
            {/*        >*/}
            {/*            <Icon name="description" size="2xl" />*/}
            {/*            Documentation*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*    <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">*/}
            {/*        <a*/}
            {/*            href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"*/}
            {/*            target="_blank"*/}
            {/*            rel="noreferrer"*/}
            {/*            className="flex items-center justify-center gap-4 text-sm font-light py-3"*/}
            {/*        >*/}
            {/*            Free Download*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*</ul>*/}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Sidebar);