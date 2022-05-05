import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter } from "@material-tailwind/react";

export default function FormSummary(props) {
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
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            User Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <Input type="text" color="purple" placeholder="Username" />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <Input type="email" color="purple" placeholder="Email Address" />
            </div>
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
              <Input type="text" color="purple" placeholder="First Name" />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <Input type="email" color="purple" placeholder="Last Name" />
            </div>
          </div>

          <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
            Contact Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-12/12 mb-10 font-light">
              <Input type="text" color="purple" placeholder="Address" />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
              <Input type="text" color="purple" placeholder="City" />
            </div>
            <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
              <Input type="text" color="purple" placeholder="Country" />
            </div>
            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
              <Input type="text" color="purple" placeholder="Postal Code" />
            </div>
          </div>

          <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
            About Me
          </h6>
          <div className="flex flex-wrap mt-10 font-light">
            <Textarea color="purple" placeholder="About Me" />
          </div>
        </form>

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
          <Button color="green" onClick={props.nextStep}>
            SUBMIT APPLICATION
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
