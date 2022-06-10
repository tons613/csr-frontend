import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import { CardFooter } from "@material-tailwind/react";
import { FormLabel as Label } from "@material-ui/core";
import Select from "react-select";
import api from "../../utils/config";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PostContactDetail } from "../../redux/actions/ApplicationActions";
import { format } from "date-fns";
import UserStatus from "utils/userStatus";

function ContactForm(props) {
  useEffect(() => {
    loadData();
  }, []);

  const [userData, setUserData] = useState({});
  const [statelist, setStatelist] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [lgalist, setLgalist] = useState([]);
  const [lgaOptions, setLgaOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState([]);
  const [stateOrgErr, setStateOrgErr] = useState(null);
  const [stateResErr, setStateResErr] = useState(null);
  const [lgaErr, setLgaErr] = useState(null);

  const loadData = () => {
    axios
      .get(api.API_URL + "/api/get_contact_biodata", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        if (
          result.data.contactData.registrationStatus !== UserStatus.IN_PROGRESS
        ) {
          props.history.push("/dashboard");
        }
        setUserData(result.data.contactData);
        setLgalist(result.data.lgaList);
        setStatelist(result.data.stateList);
        createOptions(result.data.stateList);
        createLGAInitOption(
          result.data.contactData.stateOrigin,
          result.data.lgaList
        );
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  const handleSubmit = () => {
    if (userData.country === "Nigeria") {
      const { stateOrigin, lga, stateResidence } = userData;
      if (stateOrigin === 0) setStateOrgErr("State of origin is required");
      else setStateOrgErr(null);
      if (stateResidence === 0)
        setStateResErr("State of residence is required");
      else setStateResErr(null);
      if (lga === 0) setLgaErr("LGA is required");
      else setLgaErr(null);
      if (stateOrigin === 0 || lga === 0 || stateResidence === 0) return;
    }
    setLoading(true);
    props
      .PostContactDetail(userData)
      .then(() => {
        setLoading(false);
        props.nextStep();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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

  const handleChange = (e) => {
    const newObject = { ...userData, [e.target.id]: e.target.value };
    setUserData(newObject);
  };

  const handleChangeState = (e) => {
    var stateId = e.value;
    createLGAOption(stateId);
    var geozone = Object.entries(statelist).filter(
      (geo) => geo[1].state_id === stateId
    );
    var geo = geozone[0][1].geozone.zone;
    const newObject = { ...userData, stateOrigin: stateId, geoPolZone: geo };
    setUserData(newObject);
    setStateOrgErr(null);
  };

  const handleChangeLGA = (e) => {
    const newObject = { ...userData, lga: e.value };
    setUserData(newObject);
    setLgaErr(null);
  };

  const createOptions = (statelist) => {
    let options = [];
    statelist &&
      Object.entries(statelist).map((state) => {
        options.push({ value: state[1].state_id, label: state[1].state_name });
      });
    setStateOptions(options);
  };

  const createLGAOption = (stateId) => {
    let options = [];
    lgalist &&
      Object.entries(lgalist)
        .filter((lga) => lga[1].state_id === stateId)
        .map((lg) => options.push({ value: lg[1].id, label: lg[1].lga_name }));
    setLgaOptions(options);
  };
  const createLGAInitOption = (stateId, lgalist) => {
    let options = [];
    Object.entries(lgalist)
      .filter((lga) => lga[1].state_id === stateId)
      .map((lg) => options.push({ value: lg[1].id, label: lg[1].lga_name }));
    setLgaOptions(options);
  };
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    let year = d.getFullYear();
    return [year, month, day].join("-");
  };

  // alert();


  return (
    <Card>
      <CardHeader color="orange" contentPosition="none" size="sm">
        <div className="w-full flex items-center justify-between">
          <h6 className="text-lg">Contact Details</h6>
          <h6 className="text-sm">
            Step {props.currentStep} of {props.totalSteps}
          </h6>
        </div>
      </CardHeader>
      <CardBody>
        {errMsg && errMsg.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 mx-5"
            role="alert"
          >
            <span className="block sm:inline">
              {errMsg.map((err, index) => (
                <li className="text-sm" key={index}>
                  {err}
                </li>
              ))}
            </span>
          </div>
        )}
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            Contact Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <div className="flex flex-row">
                <Label>Country</Label>
              </div>
              <Input
                type="text"
                // color="purple"
                placeholder=""
                outline={true}
                defaultValue={userData?.country}
                readOnly
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark ">
              <div className="flex flex-row">
                <Label>Date of birth</Label>
                <span className="text-red-500">*</span>
              </div>
              {/* {userData?.dob && ( */}
              <Input
                max="2010-12-31"
                placeholder=""
                outline={true}
                type="date"
                id="dob"
                defaultValue={
                  userData?.dob &&
                  format(new Date(userData?.dob.toString()), "yyyy-MM-dd")
                }
                onChange={handleChange}
              />
              {/* )} */}
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark ">
              <div className="flex flex-row">
                <Label>Gender</Label>
                <span className="text-red-500">*</span>
              </div>
              <Select
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                placeholder="Gender"
                value={[{ value: userData?.gender, label: userData?.gender }]}
                onChange={(e) => setUserData({ ...userData, gender: e.value })}
              />
            </div>
          </div>
          {userData?.country === "Nigeria" && (
            <div className="flex flex-wrap mt-5">
              <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                <div className="flex flex-row">
                  <Label>State of origin</Label>
                  <span className="text-red-500 ">*</span>
                </div>
                <Select
                  className={stateOrgErr ? "border border-red-500 rounded" : ""}
                  options={stateOptions}
                  placeholder="State of Origin"
                  value={stateOptions.filter(
                    (option) => option.value === userData?.stateOrigin
                  )}
                  onChange={handleChangeState}
                />
                <span className="text-xs text-red-500">{stateOrgErr}</span>
              </div>
              <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                <div className="flex flex-row">
                  <Label>LGA of origin</Label>
                  <span className="text-red-500 ">*</span>
                </div>
                <Select
                  className={lgaErr ? "border border-red-500 rounded" : ""}
                  options={lgaOptions}
                  placeholder="Local Govt Area"
                  id="lga"
                  value={lgaOptions.filter(
                    (option) => option.value === userData?.lga
                  )}
                  onChange={handleChangeLGA}
                />
                <span className="text-xs text-red-500">{lgaErr}</span>
              </div>
              <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
                <Label>Geo Political Zone</Label>
                <Input
                  type="text"
                  // color="purple"
                  placeholder=""
                  defaultValue={userData?.geoPolZone}
                  outline={true}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="flex flex-wrap mt-5">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Label>Resident Address</Label>
              <Input
                type="text"
                // color="purple"
                placeholder=""
                id="residentAddress"
                outline={true}
                defaultValue={userData?.residentAddress}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <div className="flex flex-row">
                <Label>City</Label>
                <span className="text-red-500 ">*</span>
              </div>
              <Input
                max="2010-12-31"
                // color="purple"
                placeholder=""
                defaultValue={userData?.city}
                outline={true}
                onChange={handleChange}
                id="city"
              />
              {/* <span className="text-red-500 ">*</span> */}
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <div className="flex flex-row">
                <Label>State of Residence</Label>
                <span className="text-red-500 ">*</span>
              </div>
              <Select
                isDisabled={userData.country !== "Nigeria"}
                className={stateResErr ? "border border-red-500 rounded" : ""}
                options={stateOptions}
                placeholder="State of Residence"
                value={stateOptions.filter(
                  (option) => option.value === userData?.stateResidence
                )}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    stateResidence: e.value,
                  });
                  setStateResErr(null);
                }}
              />
              <span className="text-xs text-red-500">{stateResErr}</span>
            </div>
          </div>
        </form>

        <div>
          {/* <p>
            <button onClick={props.previousStep}>Previous Step</button>
          </p>
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
        <div className="absolute bottom-5 right-5 ">
          <Button color="orange" onClick={handleSubmit}>
            {!loading ? (
              "Save and Continue"
            ) : (
              <>
                {" "}
                Processing... <i className="fa fa-spinner fa-2x fa-spin"></i>
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { PostContactDetail })(ContactForm)
);
