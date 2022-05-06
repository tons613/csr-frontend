import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
// import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import AuthNavbar from "components/Navbars/AuthNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";
import isEmpty from "lodash/isEmpty";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = { email: email, password: password };
    props.login(data);
  };
  const checkAuth = () => {
    const { isAuthenticated, currentUser, loading } = props.auth;
    console.log("ddddds", loading);
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
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader color="transparent" className="bg-teal-500" size="sm">
              <h6 color="white" style={{ marginBottom: 0 }}>
                Applicant Login
              </h6>
            </CardHeader>

            <CardBody>
              <div className="mb-12 px-4 bg-bb">
                <InputIcon
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-8 px-4">
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
                <Checkbox color="lightBlue" text="Remember Me" id="remember" />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center bg-bb">
                <Button
                  color="lightBlue"
                  buttonType="link"
                  size="lg"
                  ripple="dark"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Container>
      <SimpleFooter />
    </Page>
  );
}
const mapDispatchToProps = (dispatch) => {
  return { login: (credentials) => dispatch(signIn(credentials)) };
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
