import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter } from "@material-tailwind/react";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";
import api from "../../utils/config";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PostContactDetail } from "../../store/actions/ApplicationActions";

function ContactForm(props) {
  useEffect(() => {
    loadData();
  }, []);

  const [userData, setUserData] = useState({});
  const [statelist, setStatelist] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [lgalist, setLgalist] = useState([]);
  const [lgaOptions, setLgaOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    axios
      .get(api.API_URL + "/api/get_contact_biodata", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
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

  const checkRegStatus = () => {
    if (!loading && userData.registrationStatus !== "2") {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    checkRegStatus();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    props.PostContactDetail(userData).then(() => {
      setLoading(false);
      props.nextStep();
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
  };

  const handleChangeLGA = (e) => {
    const newObject = { ...userData, lga: e.value };
    setUserData(newObject);
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
  // console.log("deded", formatDate(userData.dob));
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
        <form>
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
                defaultValue={userData.country}
                readOnly
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="Date of birth"
                outline={true}
                type="date"
                id="dob"
                defaultValue={userData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                placeholder="Gender"
                value={[{ value: userData.gender, label: userData.gender }]}
                onChange={(e) => setUserData({ ...userData, gender: e.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap lg:mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={stateOptions}
                placeholder="State of Origin"
                value={stateOptions.filter(
                  (option) => option.value === userData.stateOrigin
                )}
                onChange={handleChangeState}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={lgaOptions}
                placeholder="Local Govt Area"
                id="lga"
                value={lgaOptions.filter(
                  (option) => option.value === userData.lga
                )}
                onChange={handleChangeLGA}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                placeholder="Geo Political Zone"
                defaultValue={userData.geoPolZone}
                outline={true}
                onChange={handleChange}
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
                defaultValue={userData.residentAddress}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="City"
                defaultValue={userData.city}
                outline={true}
                onChange={handleChange}
                id="city"
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={stateOptions}
                placeholder="State of Residence"
                value={stateOptions.filter(
                  (option) => option.value === userData.stateResidence
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    stateResidence: e.value,
                  })
                }
              />
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
