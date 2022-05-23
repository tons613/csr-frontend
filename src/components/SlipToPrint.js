import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter, Image } from "@material-tailwind/react";
import axios from "axios";
import api from "../utils/config";
import React from "react";

class SlipToPrint extends React.Component {
  state = {
    userData: [],
    passport: "",
  };
  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    axios
      .get(api.API_URL + "/api/exam-slip", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        if (result.data.userdata.registrationStatus !== 3) {
          this.props.history.push("/dashboard/Application");
        }
        this.setState({ userData: result.data.userdata });
        this.setState({ passport: result.data.passport });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  render() {
    const { userData, passport } = this.state;
    return (
      <div className="w-8/12 mx-auto">
        <Card>
          <CardBody>
            <div className="card-header text-center">
              <h2>
                PERSONAL DATA SLIP
                <br />
              </h2>
              <small className="text-primary">
                <b> KINDLY COME ALONG WITH THIS SLIP TO THE EXAM VENUE</b>{" "}
              </small>
            </div>
            <div className="mt-2 ">
              <Image
                src={`${api.API_URL}/${passport}`}
                className="mx-auto"
                style={{ width: 120, height: 120 }}
              />
            </div>
            <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
              Applicant Details
            </h6>
            <div className="flex flex-wrap mt-10">
              <div className="w-6/12 pr-4 mb-10 font-dark">
                <Input
                  type="text"
                  placeholder="Surname"
                  // outline={true}
                  defaultValue={userData?.lastName}
                  disabled
                />
              </div>
              <div className="w-6/12 pr-4 mb-10 font-dark">
                <Input
                  type="text"
                  placeholder="Othernames"
                  // outline={true}
                  defaultValue={userData?.otherNames}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap ">
              <div className="w-6/12 pr-4 mb-10 font-dark">
                <Input
                  type="text"
                  placeholder="Gender"
                  // outline={true}
                  defaultValue={userData?.gender}
                  disabled
                />
              </div>
              <div className="w-6/12 pr-4 mb-10 font-dark">
                <Input
                  type="text"
                  placeholder="Application Number"
                  // outline={true}
                  defaultValue={userData?.applicationNo}
                  disabled
                />
              </div>
            </div>
            <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
              TEST VENUE
            </h6>
            <div className="flex flex-wrap lg:mt-10">
              <div className="w-4/12 pr-4 mb-10 font-dark">
                <Input
                  type="text"
                  placeholder="Test Center"
                  disabled
                  // outline={true}
                  defaultValue={userData?.actualCentre}
                />
              </div>
              <div className="w-8/12 pr-4 mb-10 font-dark">
                <Input
                  max="2010-12-31"
                  color="purple"
                  placeholder="Center Address"
                  defaultValue={userData?.address}
                  //   outline={true}
                  disabled
                />
              </div>
            </div>
          </CardBody>
          {/* <CardFooter>
            <div className=" ">
              <Button color="green" onClick={handlePrint}>
                PRINT
              </Button>
            </div>
          </CardFooter> */}
        </Card>
      </div>
    );
  }
}

export default SlipToPrint;
