import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import AuthNavbar from "components/Navbars/AuthNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";

export default function Register() {
  return (
    <Page>
      <AuthNavbar />
      <Container style={{ width: 600 }}>
        <Card>
          <CardHeader color="transparent" className="bg-teal-500" size="sm">
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
                value="Anthony EZEAMAKA"
                disabled={true}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="tel"
                color="lightBlue"
                placeholder="Phone number"
                iconName="email"
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email Address"
                iconName="email"
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                placeholder="Password"
                iconName="lock"
              />
            </div>
            <div className="mb-4 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                placeholder="Password"
                iconName="lock"
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                color="lightBlue"
                buttonType="link"
                size="lg"
                ripple="dark"
              >
                Create Account
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
      <SimpleFooter />
    </Page>
  );
}
