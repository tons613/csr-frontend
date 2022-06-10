import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter, Image } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/config";
import { Radio } from "@material-ui/core";
import { connect } from "react-redux";
import { SubmitForm } from "../../redux/actions/ApplicationActions";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { format } from "date-fns";
import UserStatus from "utils/userStatus";

function MyApplicationInfo(props) {
  const [userData, setUserData] = useState({});
  const [userfiles, setUserfiles] = useState([]);
  const [passport, setPassprt] = useState("");
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get(api.API_URL + "/api/formcomplete", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        if (result.data.registrationStatus === UserStatus.IN_PROGRESS) {
          props.history.push("/dashboard/Application");
        }
        setUserData(result.data.userdata);
        setUserfiles(result.data.userfiles);
        setLoading(false);
        var passport = Object.entries(result.data.userfiles).filter(
          (file) => file[1].documentName === "Passport"
        );
        setPassprt(passport[0][1].systemFilePath);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return "COMPLETED";
      case 2:
        return "UNCOMPLETED";
      case 3:
        return "VALIDATED";
      case 4:
        return "APPLICATION REJECTED";
      case 5:
        return "AWARDED PENDING ACCEPTANCE";
      case 6:
        return "SCHOLARSHIP AWARDED";
    }
  };
  return (
    <>
      {Object.entries(userData).length > 0 ? (
        <>
          <Card>
            <CardHeader color="orange" contentPosition="none" size="sm">
              <div className="w-full flex items-center justify-between">
                <h6 className="text-lg">My Application Information</h6>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mt-2 ">
                <Image
                  src={`${api.API_URL}/${passport}`}
                  className="mx-auto"
                  style={{ width: 120, height: 120 }}
                />
              </div>
              <div className=" my-10 w-full">
                {/* <div className="mx-auto font-bold text-gray-500">
                  Application Status: {getStatus(userData?.registrationStatus)}
                </div> */}
                <div className="mx-auto font-bold text-gray-700">
                  Application Number: {userData?.applicationNo}
                </div>
              </div>
              <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap mt-10">
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Country"
                    outline={true}
                    defaultValue={userData?.country}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Date of birth"
                    outline={true}
                    defaultValue={format(
                      new Date(userData?.dob.toString()),
                      "dd/MM/yyyy"
                    )}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
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
                    placeholder="State of origin"
                    outline={true}
                    defaultValue={userData?.stateOrigin}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Local Govt Area"
                    outline={true}
                    defaultValue={userData?.lga}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
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
                    placeholder="Resident Address"
                    readOnly
                    outline={true}
                    defaultValue={userData?.residentAddress}
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="City"
                    defaultValue={userData?.city}
                    outline={true}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="State of resident"
                    defaultValue={userData?.stateResidence}
                    outline={true}
                    readOnly
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
                    placeholder="University"
                    outline={true}
                    defaultValue={userData?.university}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Faculty"
                    outline={true}
                    defaultValue={userData?.faculty}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    color="blue"
                    placeholder="Department"
                    outline={true}
                    defaultValue={userData?.department}
                    readOnly
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap mt-10">
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Entry Year"
                    outline={true}
                    defaultValue={userData?.entryYear}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Current year of study"
                    outline={true}
                    defaultValue={userData?.currentStudyYear}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Graduation year"
                    outline={true}
                    defaultValue={userData?.graduationYear}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-10">
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Matriculation number"
                    outline={true}
                    readOnly
                    defaultValue={userData?.matricNum}
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="JAMB/UTME Score"
                    outline={true}
                    defaultValue={userData?.jambScore}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Programme type"
                    outline={true}
                    defaultValue={userData?.programmeType}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-10">
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="CGPA"
                    outline={true}
                    defaultValue={userData?.cgpa}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    max="2010-12-31"
                    placeholder="Grade Scale"
                    outline={true}
                    defaultValue={userData?.gradeScale}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Post-UTME Score"
                    outline={true}
                    defaultValue={userData?.postUTMEScore}
                    readOnly
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
                    placeholder="First choice center"
                    outline={true}
                    defaultValue={userData?.firstTestCenter}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                  <Input
                    type="text"
                    placeholder="Second choice center"
                    outline={true}
                    defaultValue={userData?.secondTestCenter}
                    readOnly
                  />
                </div>
                <div className="w-full lg:w-4/12  mb-10 font-dark">
                  <label className="form-check-label">
                    Are you a beneficiary of any other scholarship award
                    schemes?
                  </label>
                  <Radio
                    color="primary"
                    text="Yes"
                    id="PreviouslyBenefited"
                    name="PreviouslyBenefited"
                    disabled
                    defaultChecked={userData?.previouslyBenefited === "Y"}
                  />
                  <Radio
                    color="primary"
                    text="No"
                    id="PreviouslyBenefited1"
                    name="PreviouslyBenefited"
                    disabled
                    defaultChecked={userData?.previouslyBenefited === "N"}
                  />
                </div>
              </div>

              <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                UPLOADED FILES
              </h6>
              <div className="flex flex-wrap mt-3">
                {Object.entries(userfiles)
                  .filter((fil) => fil[1].documentName !== "Passport")
                  .map((fileInfos) => (
                    <Fragment key={fileInfos[1].documentName}>
                      <div className="w-full  mb-5 font-dark">
                        <span>{fileInfos[1].documentName}</span>
                        <div className="bg-[#8CC1C1] p-1 px-2 rounded lg:w-6/12">
                          <a
                            href={`${api.API_URL}/${fileInfos[1].systemFilePath}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white"
                          >
                            View uploaded file
                          </a>
                        </div>
                      </div>
                    </Fragment>
                  ))}
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
          </Card>
        </>
      ) : (
        "Loading Record...."
      )}
    </>
  );
}

export default withRouter(connect(null, { SubmitForm })(MyApplicationInfo));
