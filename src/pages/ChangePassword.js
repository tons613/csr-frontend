import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import { CardFooter, InputIcon } from "@material-tailwind/react";
import { useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { ChangePassword } from "../redux/actions/authActions";

function ChangeUserPassword(props) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sucessMsg, setSucessMsg] = useState(null);

  const handleSave = () => {
    setLoading(true);
    setErrMsg(null);
    setSucessMsg(null);
    var data = {
      CurrentPassword: password,
      Password: newPassword,
      ConfirmPassword: confirmPassword,
    };
    props
      .ChangePassword(data)
      .then((result) => {
        setLoading(false);
        Swal.fire(
          "Successful",
          "Password has been updated succesfully",
          "success"
        );
        setErrMsg(null);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSucessMsg("Password Updated Successfully!");
      })
      .catch((error) => {
        setLoading(false);

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
    // <Page>
    <div className="h-auto lg:w-9/12 mx-auto " style={{ minHeight: "807px" }}>
      <div className="container mx-auto max-w-full">
        <div className="lg:w-6/12 mx-auto">
          <div className="xl:col-start-2 xl:col-end-5 lg:px-4 mb-16"></div>
          <Card>
            <CardHeader color="orange" contentPosition="none" size="sm">
              <div className="w-full flex items-center justify-between">
                <h6 className="text-lg">CHANGE PASSWORD</h6>
              </div>
            </CardHeader>
            <CardBody>
              {errMsg && errMsg !== "" && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 mx-5"
                  role="alert"
                >
                  <span className="text-sm block sm:inline">{errMsg}</span>
                </div>
              )}
              {sucessMsg && (
                <div
                  className="bg-green-100 border border-red-400 text-green-700 px-4 py-3 rounded relative mb-8 mx-5"
                  role="alert"
                >
                  <span className="text-sm block sm:inline">{sucessMsg}</span>
                </div>
              )}
              <div className="mb-8 px-4">
                <InputIcon
                  type="password"
                  color="lightBlue"
                  placeholder="Current Password"
                  iconName="lock"
                  outline={true}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-8 px-4">
                <InputIcon
                  type="password"
                  color="lightBlue"
                  placeholder="New Password"
                  required
                  outline={true}
                  iconName="lock"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-5 px-4">
                <InputIcon
                  type="password"
                  color="lightBlue"
                  placeholder="Confirm Password"
                  iconName="lock"
                  outline={true}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                  color="orange"
                  onClick={handleSave}
                  ripple="dark"
                  disabled={loading}
                >
                  {!loading ? (
                    "Update Password"
                  ) : (
                    <>
                      Validating...{" "}
                      <i className="fa fa-spinner fa-2x fa-spin"></i>
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    // </Page>
  );
}
export default connect(null, { ChangePassword })(ChangeUserPassword);
