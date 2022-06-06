import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
// import H5 from '@material-tailwind/react/Heading5';
import InputIcon from "@material-tailwind/react/InputIcon";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import AuthNavbar from "components/Navbars/AuthNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ForgotPassword } from "../redux/actions/authActions";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";

function ForgotPasswordd(props) {
  const [email, setEmail] = useState("");
  const { authError, auth } = props;
  const [succMsg, setSuccMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.ForgotPassword({ email }).then(() => {
      setSuccMsg(
        "Password reset link has been sent to your email. Please check your email to continue."
      );
      setEmail("");
    });
  };
  const checkAuth = () => {
    const { isAuthenticated, currentUser, loading } = auth;
    if (isAuthenticated && !isEmpty(currentUser)) {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    checkAuth();
  });
  return (
    <Page>
      <AuthNavbar />
      <Container>
        {authError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 mx-5"
            role="alert"
          >
            {authError}
            {/* {authError && authError.map((err) => <li>{err}</li>)} */}
          </div>
        )}
        {succMsg && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8 mx-5"
            role="alert"
          >
            {succMsg}
            {/* {authError && authError.map((err) => <li>{err}</li>)} */}
          </div>
        )}
        <Card>
          <form onSubmit={handleSubmit}>
            {/* <CardHeader color="transparent" className="bg-[#F1A83B]" size="sm">
              <h5 className="text-lg font-medium text-center text-white">
                Applicant Login
              </h5>
            </CardHeader> */}

            <CardBody>
              <h5 className="text-lg font-light text-center text-gray-700 mb-5">
                Reset password
              </h5>
              <hr className="mb-10" />
              <div className="mb-5 px-4 bg-bb">
                <InputIcon
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                  outline={true}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-center bg-bb">
                <Button
                  color="lightBlue"
                  // buttonType="link"
                  // size="lg"
                  ripple="dark"
                  type="submit"
                >
                  {auth.loading ? (
                    <>
                      Loading... <i className="fa fa-spinner fa-2x fa-spin"></i>
                    </>
                  ) : (
                    "Send Password Reset Link"
                  )}
                </Button>
              </div>
            </CardBody>
            <CardFooter>
              <div className="text-sm text-orange-500 text-center">
                <Link to="/auth/login">Back to Login</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Container>
      <SimpleFooter />
    </Page>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   return { login: (credentials) => dispatch(ForgotPassword(credentials)) };
// };
const mapStateToProps = (state) => ({
  auth: state.auth,
  authError: state.auth.authError,
});
export default connect(mapStateToProps, { ForgotPassword })(ForgotPasswordd);
