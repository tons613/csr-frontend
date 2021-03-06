import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from "assets/img/default-avatar.png";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { useEffect, useState } from "react";
import api from "../../utils/config";
import { Link } from "react-router-dom";

function AdminNavbar({ showSidebar, setShowSidebar, signOut, auth }) {
  const location = useLocation().pathname;
  const { currentUser } = auth;
  // console.log(currentUser);
  const [profilePic, setProfilePic] = useState(ProfilePicture);
  useEffect(() => {
    if (currentUser.profilePic)
      setProfilePic(`${api.API_URL}/${currentUser.profilePic}`);
  });
  return (
    <nav
      className="bg-gray-200 py-7 px-3 md:ml-64 h-200"
      style={{ borderBottom: "thin orange solid" }}
    >
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="orange" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="orange" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-orange text-sm1 tracking-wider mt-1">
            {/*{location === '/'*/}
            {/*    ? 'DASHBOARD'*/}
            {/*    : location.toUpperCase().replace('/', '')}*/}
            Total National Merit Scholarship Scheme
          </h4>

          <div className="flex">
            {/*<NavbarInput placeholder="Search" />*/}

            <div className="-mr-4 ml-6">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-12">
                    <Image src={profilePic} rounded />
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: "transparent",
                }}
              >
                <DropdownItem color="lightBlue" onClick={() => signOut()}>
                  Logout
                </DropdownItem>
                <DropdownItem color="lightBlue">
                  <Link to="/dashboard/change-password">Change Password</Link>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(AdminNavbar);