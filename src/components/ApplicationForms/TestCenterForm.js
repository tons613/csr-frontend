import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Radio from "@material-tailwind/react/radio";
import { CardFooter } from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import api from "../../utils/config";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PostTestCenter } from "../../redux/actions/ApplicationActions";

const options = [
  { value: "chocolate", label: "Abia" },
  { value: "strawberry", label: "Adamawa" },
  { value: "vanilla", label: "Akwa Ibom" },
];
function TestCenterForm(props) {
  const [userData, setUserData] = useState({});
  const [choice1Options, setChoice1Options] = useState([]);
  const [choice2Options, setChoice2Options] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState([]);

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
        createFacOptions(result.data.testCenters);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  const createFacOptions = (data) => {
    let options = [];
    data &&
      Object.entries(data).map((lg) => {
        options.push({ value: lg[1].id, label: lg[1].center });
      });
    setChoice1Options(options);
    setChoice2Options(options);
  };

  const handleSubmit = () => {
    setLoading(true);

    props
      .PostTestCenter(userData)
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
  return (
    <Card>
      <CardHeader color="orange" contentPosition="none" size="sm">
        <div className="w-full flex items-center justify-between">
          <h6 className="text-lg">Choose Test Center</h6>
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
        )}{" "}
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            CHOOSE A TEST VENUE
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={choice1Options}
                placeholder="First choice center"
                value={choice1Options.filter(
                  (option) => option.value === userData.firstTestCenter
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    firstTestCenter: e.value,
                  })
                }
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select
                options={choice2Options}
                placeholder="Second choice center"
                value={choice2Options.filter(
                  (option) => option.value === userData.secondTestCenter
                )}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    secondTestCenter: e.value,
                  })
                }
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
                defaultChecked={userData.previouslyBenefited === "Y"}
                value="Y"
              />
              <Radio
                color="teal"
                text="No"
                id="PreviouslyBenefited1"
                name="PreviouslyBenefited"
                defaultChecked={userData.previouslyBenefited === "N"}
                value="N"
              />
            </div>
          </div>
        </form>
        <div>
          {/* 
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

export default connect(null, { PostTestCenter })(TestCenterForm);