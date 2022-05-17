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

const options = [
  { value: "chocolate", label: "Abia" },
  { value: "strawberry", label: "Adamawa" },
  { value: "vanilla", label: "Akwa Ibom" },
];
export default function TestCenterForm(props) {
  const [userData, setUserData] = useState({});
  const [statelist, setStatelist] = useState([]);
  const [uniOptions, setUniOptions] = useState([]);
  const [lgalist, setLgalist] = useState([]);
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
        // setUserData(result.data.formData);
        // // setLgalist(result.data.lgaList);
        // // setStatelist(result.data.stateList);
        // createUniOptions(result.data.institutionList);
        // createFacOptions(result.data.facultyList);
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
          <h6 className="text-lg">Choose Test Center</h6>
          <h6 className="text-sm">
            Step {props.currentStep} of {props.totalSteps}
          </h6>
        </div>
      </CardHeader>
      <CardBody>
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            CHOOSE A TEST VENUE
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select options={options} placeholder="First choice centerr" />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Select options={options} placeholder="Second choice center" />
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
                value="Y"
              />
              <Radio
                color="teal"
                text="No"
                id="PreviouslyBenefited1"
                name="PreviouslyBenefited"
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
          <Button color="orange" onClick={props.nextStep}>
            Save and Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
