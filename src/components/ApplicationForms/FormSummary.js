import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/config";
import { Radio } from "@material-ui/core";
import { connect } from "react-redux";
import { SubmitForm } from "../../redux/actions/ApplicationActions";

function FormSummary(props) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState([]);
  const handleSubmit = () => {
    setLoading(true);

    props
      .SubmitForm(userData)
      .then(() => {
        setLoading(false);
        props.nextStep();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        var errmsg = [];
        if (error.response) {
          for (const [key, value] of Object.entries(error.response.data)) {
            errmsg.push(value);
            console.log(value);
          }
        } else {
          errmsg.push(
            "An Error ocurred. Request could not be processed. Please try again later"
          );
        }
        setErrMsg(errmsg);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    axios
      .get(api.API_URL + "/api/get_CenterChoice", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        setUserData(result.data.formData);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  return (
    <Card>
      <CardHeader color="orange" contentPosition="none" size="sm">
        <div className="w-full flex items-center justify-between">
          <h6 className="text-lg">Review Your Submitted Information</h6>
          <h6 className="text-sm">
            Step {props.currentStep} of {props.totalSteps}
          </h6>
        </div>
      </CardHeader>
      <CardBody>
        <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
          Contact Information
        </h6>
        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Country"
              outline={true}
              defaultValue={userData?.country}
              readOnly
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Date of birth"
              outline={true}
              defaultValue={userData?.dob}
              readOnly
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Gender"
              outline={true}
              defaultValue={userData?.gender}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-wrap lg:mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="State of origin"
              outline={true}
              defaultValue={userData?.country}
              readOnly
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Local Govt Area"
              outline={true}
              defaultValue={userData?.country}
              readOnly
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Geo Political Zone"
              defaultValue={userData?.geoPolZone}
              outline={true}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-wrap lg:mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Resident Address"
              id="residentAddress"
              outline={true}
              defaultValue={userData?.residentAddress}
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="City"
              defaultValue={userData?.city}
              outline={true}
              id="city"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="State of resident"
              defaultValue={userData?.city}
              outline={true}
              id="city"
            />
          </div>
        </div>

        <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
          EDUCATIONAL INFORMATION
        </h6>
        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            {/* <Label color="transparent">University</Label> */}
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="University"
              outline={true}
              defaultValue={userData?.university}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="Faculty"
              outline={true}
              defaultValue={userData?.faculty}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="blue"
              placeholder="Department"
              outline={true}
              defaultValue={userData?.department}
              id="department"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="Entry Year"
              outline={true}
              defaultValue={userData?.entryYear}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="Current year of study"
              outline={true}
              defaultValue={userData?.currentStudyYear}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="Graduation year"
              outline={true}
              defaultValue={userData?.graduationYear}
              id="jambScore"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Matriculation number"
              outline={true}
              id="matricNum"
              defaultValue={userData?.matricNum}
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="JAMB/UTME Score"
              outline={true}
              defaultValue={userData?.jambScore}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="Programme type"
              outline={true}
              defaultValue={userData?.programmeType}
              id="jambScore"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark"></div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              max="2010-12-31"
              color="purple"
              placeholder="JAMB/UTME Score"
              outline={true}
              defaultValue={userData?.jambScore}
              id="jambScore"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Post-UTME Score"
              outline={true}
              defaultValue={userData?.postUTMEScore}
              id="postUTMEScore"
            />
          </div>
        </div>

        <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
          CHOOSE A TEST VENUE
        </h6>
        <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="First choice center"
              outline={true}
              defaultValue={userData?.firstTestCenter}
              id="cgpa"
            />
          </div>
          <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
            <Input
              type="text"
              color="purple"
              placeholder="Second choice center"
              outline={true}
              defaultValue={userData?.secondTestCenter}
              id="cgpa"
            />
          </div>
          <div className="w-full lg:w-4/12  mb-10 font-dark">
            <label className="form-check-label">
              Are you a beneficiary of any other scholarship award schemes?
            </label>
            <Radio
              color="teal"
              text="Yes"
              id="PreviouslyBenefited"
              name="PreviouslyBenefited"
              defaultChecked={userData?.previouslyBenefited === "Y"}
              value="Y"
            />
            <Radio
              color="teal"
              text="No"
              id="PreviouslyBenefited1"
              name="PreviouslyBenefited"
              defaultChecked={userData?.previouslyBenefited === "N"}
              value="N"
            />
          </div>
        </div>

        <div>
          {/* 
          <p>
            <button>Next Step</button>
          </p>
          <p>
            <button onClick={() => props.goToStep(2)}>Step 2</button>
          </p>
          <p>
            <button onClick={props.firstStep}>First Step</button>
          </p>
          <p>
            <button onClick={props.lastStep}>Last Step</button>
          </p> */}
        </div>
      </CardBody>
      <CardFooter>
        <div className="absolute bottom-5 left-5 ">
          <Button color="gray" onClick={props.previousStep}>
            Previous
          </Button>
        </div>
        <div className="absolute bottom-5 right-5 ">
          <Button color="green" onClick={handleSubmit}>
            SUBMIT APPLICATION
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default connect(null, { SubmitForm })(FormSummary);