import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter } from "@material-tailwind/react";

export default function InstitutionForm(props) {
  return (
    <Card>
      <CardHeader color="orange" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Institution Information</h2>
          <h2>
            Step {props.currentStep} of {props.totalSteps}
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <form>
          <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            Educational Information
          </h6>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                placeholder="University"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="Faculty"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12  mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                pr-4
                placeholder="Department"
                outline={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                placeholder="Entry Year"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="Current year of study"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12  mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                pr-4
                placeholder="Graduation year"
                outline={true}
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
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="Programme type"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12  mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                pr-4
                placeholder="Grade scale"
                outline={true}
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
              />
            </div>
            <div className="w-full lg:w-4/12 pr-4 mb-10 font-dark">
              <Input
                max="2010-12-31"
                color="purple"
                placeholder="JAMB/UTME Score"
                outline={true}
              />
            </div>
            <div className="w-full lg:w-4/12  mb-10 font-dark">
              <Input
                type="text"
                color="purple"
                pr-4
                placeholder="Post-UTME Score"
                outline={true}
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
          <Button color="orange" onClick={props.nextStep}>
            Save and Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
