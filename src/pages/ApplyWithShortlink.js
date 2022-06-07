import AuthNavbar from "components/Navbars/AuthNavbar";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/config";
import { Link } from "react-router-dom";

function ApplyWithShortlink(props) {
  const [requestError, setRrequestError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = props.match.params;
  console.log(token);
  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${api.API_URL}/api/get_shortlink_token/${token}`)
        .then((data) => {
          setLoading(false);
          props.history.push("/apply?token=" + data.data.token);
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

  return (
    <Page>
      <AuthNavbar />
      <Container>
        {loading && (
          <div className="text-center ">
            <i className="fa fa-spinner fa-4x fa-spin text-gray-700"></i>
          </div>
        )}
        {requestError ? (
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
        ) : null}
      </Container>
    </Page>
  );
}

export default ApplyWithShortlink;
