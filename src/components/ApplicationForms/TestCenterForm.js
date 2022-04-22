import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Radio from "@material-tailwind/react/radio";
import { CardFooter } from "@material-tailwind/react";

export default function TestCenterForm(props) {
  return (
    <Card>
      <CardHeader color="orange" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Choose Test Center</h2>
          <h2>
            Step {props.currentStep} of {props.totalSteps}
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <form>
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
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="Second choice center"
                outline={true}
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
