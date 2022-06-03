import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter, Image } from "@material-tailwind/react";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../utils/config";
import { Radio } from "@material-ui/core";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import SlipToPrint from "../components/SlipToPrint";
import ReactToPrint from "react-to-print";
import UserStatus from "utils/userStatus";

function PrintSlip(props) {
  const [userData, setUserData] = useState({});
  const [passport, setPassprt] = useState("");
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get(api.API_URL + "/api/exam-slip", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        if (
          result.data.userdata.registrationStatus !==
          UserStatus.APPLICATION_VALIDATED
        ) {
          props.history.push("/dashboard/Application");
        }
        setUserData(result.data.userdata);
        setPassprt(result.data.passport);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };
  let componentRef = useRef();
  return (
    <>
      <Card>
        <SlipToPrint ref={(el) => (componentRef = el)} />
        <div className="mx-auto w-2/12">
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => <Button>PRINT!</Button>}
            content={() => componentRef}
          />
        </div>
      </Card>
    </>
  );
}

export default withRouter(PrintSlip);
