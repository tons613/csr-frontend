import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import AuthNavbar from "components/Navbars/AuthNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/config";
import { connect } from "react-redux";
import { createAccount } from "../redux/actions/authActions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Register(props) {
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const [userData, setUserData] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMsg, setErrMsg] = useState([]);
  const [requestError, setRrequestError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoadin, setAuthLoadin] = useState(false);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${api.API_URL}/api/create-account?token=${token}`)
        .then((data) => {
          setUserData(data.data);
          setEmail(data.data.email);
          setPhone(data.data.phoneNumber);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            setRrequestError(err.response.data);
          } else {
            setRrequestError(
              "Invalid Request. Please check your network connection and try again"
            );
          }
          setLoading(false);
        });
    } else props.history.push("/auth/login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthLoadin(true);
    setErrMsg([]);
    var data = {
      Email: email,
      Fullname: userData.fullname,
      StudentId: userData.studentId,
      PhoneNumber: phone,
      Country: userData.country,
      Password: password,
      ConfirmPassword: passwordConfirm,
    };
    props
      .createAccount(data)
      .then((result) => {
        setAuthLoadin(false);
        Swal.fire(
          "Account created successfully!",
          " Please login to continue with your application",
          "success"
        ).then(() => props.history.push("/auth/login"));
      })
      .catch((error) => {
        setAuthLoadin(false);
        if (error.errors) {
          var errmsg = [];
          for (const [key, value] of Object.entries(error.errors)) {
            errmsg.push(value);
          }
          setErrMsg(errmsg);
        } else {
          var errmsg = [];
          for (const [key, value] of Object.entries(error)) {
            errmsg.push(value);
          }
          setErrMsg(errmsg);
        }
      });
  };

  return (
    <Page>
      <AuthNavbar />
      <Container style={{ width: 600 }}>
        {loading ? (
          "Loading..."
        ) : requestError ? (
          <div
            className="bg-orange-200 text-center border border-red-400 text-orange-800 px-4 py-10 rounded relative mb-8 mx-5"
            role="alert"
          >
            <span className=" mb-10">Error! </span>
            <strong className=" mb-10">{requestError}</strong>
            <br />
            <br />
            <Link to="/auth/login">
              <span className="mt-5 text-black">Goto Login</span>
            </Link>
          </div>
        ) : (
          <>
            {errMsg && errMsg.length > 0 && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 mx-5"
                role="alert"
              >
                <span className="block sm:inline">
                  {errMsg.map((err) => (
                    <li className="text-sm">{err}</li>
                  ))}
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader
                  color="transparent"
                  className="bg-teal-500"
                  className1="bg-[#F1A83B]"
                  size="sm"
                >
                  <h6 color="black" style={{ marginBottom: 0 }}>
                    Create User Account
                  </h6>
                </CardHeader>

                <CardBody>
                  <div className="mb-10 px-4">
                    <InputIcon
                      type="text"
                      color="lightBlue"
                      placeholder="Full Name"
                      iconName="account_circle"
                      defaultValue={userData.fullname}
                      disabled={true}
                    />
                  </div>
                  <div className="mb-10 px-4">
                    <InputIcon
                      type="tel"
                      color="lightBlue"
                      placeholder="Phone number"
                      iconName="email"
                      defaultValue={userData.phoneNumber}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-10 px-4">
                    <InputIcon
                      type="email"
                      color="lightBlue"
                      placeholder="Email Address"
                      iconName="email"
                      // readOnly={userData.hasEmail}
                      defaultValue={userData.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-10 px-4">
                    <InputIcon
                      type="password"
                      color="lightBlue"
                      placeholder="Password"
                      iconName="lock"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 px-4">
                    <InputIcon
                      type="password"
                      color="lightBlue"
                      placeholder="Password"
                      iconName="lock"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="flex justify-center">
                    <Button
                      color="teal"
                      // buttonType="link"
                      size="lg"
                      ripple="dark"
                    >
                      {authLoadin ? (
                        <>
                          Processing...{" "}
                          <i className="fa fa-spinner fa-2x fa-spin"></i>
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </>
        )}
      </Container>
      <SimpleFooter />
    </Page>
  );
}

// const mapDispatchtoProps = () => {
//   return {
//     createAccount: (data) => createAccount(data),
//   };
// };
export default connect(null, { createAccount })(Register);