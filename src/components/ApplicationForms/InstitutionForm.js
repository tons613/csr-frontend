import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter, Label } from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import api from "../../utils/config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PostInstitution } from "../../redux/actions/ApplicationActions";

function InstitutionForm(props) {
  const [userData, setUserData] = useState({});
  const [uniOptions, setUniOptions] = useState([]);
  const [facOptions, setFacOptions] = useState([]);
  const [entryYearOptions, setEntryYearOptions] = useState([]);
  const [gradYearOptions, setGradYearOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState([]);

  const loadData = () => {
    axios
      .get(api.API_URL + "/api/Institution", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        setUserData(result.data.formData);
        createUniOptions(result.data.institutionList);
        createFacOptions(result.data.facultyList);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  useEffect(() => {
    loadData();
    setEntryYearOptions(
      createYearOptions(new Date().getFullYear() - 4, new Date().getFullYear())
    );
    setGradYearOptions(
      createYearOptions(new Date().getFullYear(), new Date().getFullYear() + 6)
    );
  }, []);

  const checkRegStatus = () => {
    if (!loading && userData?.registrationStatus !== "2") {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    checkRegStatus();
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    props
      .PostInstitution(userData)
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

  const handleChange = (e) => {
    const newObject = { ...userData, [e.target.id]: e.target.value };
    setUserData(newObject);
  };

  const handleSelectChange = (e) => {
    const newObject = { ...userData, [e.target.id]: e.value };
    setUserData(newObject);
  };

  const createUniOptions = (unis) => {
    let options = [];
    unis &&
      Object.entries(unis).map((state) => {
        options.push({
          value: state[1].id,
          label: state[1].institutionName,
        });
      });
    setUniOptions(options);
  };

  const createFacOptions = (faculties) => {
    let options = [];
    faculties &&
      Object.entries(faculties).map((lg) => {
        options.push({ value: lg[1].id, label: lg[1].facultyName });
      });
    setFacOptions(options);
  };

  const createYearOptions = (begin, end) => {
    let options = [];
    for (let i = begin; i <= end; i++) {
      options.push({
        value: i,
        label: i,
      });
    }
    return options;
  };
  console.log(userData);
  return (
    <Card>
      <CardHeader color="orange" contentPosition="none" size="sm">
        <div className="w-full flex items-center justify-between">
          <h6 className="text-lg">Institution Information</h6>
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
              {errMsg.map((err) => (
                <li className="text-sm">{err}</li>
              ))}
            </span>
          </div>
        )}
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            Educational Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              {/* <Label color="transparent">University</Label> */}
              <Select
                options={uniOptions}
                placeholder="University"
                value={uniOptions.filter(
                  (option) => option.value === userData?.university
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    university: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                isRrequired
                options={facOptions}
                placeholder="Faculty"
                value={facOptions.filter(
                  (option) => option.value === userData?.faculty
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    faculty: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                type="text"
                color="blue"
                placeholder="Department"
                outline={true}
                onChange={handleChange}
                defaultValue={userData?.department}
                id="department"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={entryYearOptions}
                placeholder="Entry Year"
                value={entryYearOptions.filter(
                  (option) => option.value === userData?.entryYear
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    entryYear: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={[
                  { value: "100L", label: "100 Level" },
                  { value: "200L", label: "200 Level" },
                ]}
                placeholder="Current year of study"
                value={[
                  {
                    value: userData?.currentStudyYear,
                    label: userData?.currentStudyYear,
                  },
                ]}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    currentStudyYear: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={gradYearOptions}
                placeholder="Graduation year"
                value={gradYearOptions.filter(
                  (option) => option.value === userData?.graduationYear
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    graduationYear: e.value,
                  })
                }
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
                onChange={handleChange}
                id="matricNum"
                defaultValue={userData?.matricNum}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={[
                  { value: "Fulltime", label: "Fulltime" },
                  { value: "Sandwith/Part-time", label: "Sandwith/Part-time" },
                ]}
                placeholder="Programme type"
                value={[
                  {
                    value: userData?.programmeType,
                    label: userData?.programmeType,
                  },
                ]}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    programmeType: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={[
                  { value: "4-Point", label: "4-Point Scale" },
                  { value: "5-Point", label: "5-Point Scale" },
                ]}
                placeholder="Grade scale"
                value={[
                  { value: userData?.gradeScale, label: userData?.gradeScale },
                ]}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    gradeScale: e.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                placeholder="CGPA"
                outline={true}
                onChange={handleChange}
                defaultValue={userData?.cgpa}
                id="cgpa"
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="JAMB/UTME Score"
                outline={true}
                onChange={handleChange}
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
                onChange={handleChange}
                defaultValue={userData?.postUTMEScore}
                id="postUTMEScore"
              />
            </div>
          </div>
        </form>

        {/* <div>
          <p>Is Active: {props.isActive}</p>
          <p>
            <button onClick={() => props.goToStep(2)}>Step 2</button>
          </p>
          <p>
            <button onClick={props.firstStep}>First Step</button>
          </p>
          <p>
            <button onClick={props.lastStep}>Last Step</button>
          </p>
        </div> */}
      </CardBody>
      <CardFooter>
        <div className="absolute bottom-5 left-5 ">
          <Button color="gray" onClick={props.previousStep}>
            Previous
          </Button>
        </div>
        <div className="absolute bottom-5 right-5 ">
          <Button color="orange" onClick={handleSubmit}>
            {!loading ? (
              "Save and Continue"
            ) : (
              <>
                Processing... <i className="fa fa-spinner fa-2x fa-spin"></i>
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default withRouter(connect(null, { PostInstitution })(InstitutionForm));
