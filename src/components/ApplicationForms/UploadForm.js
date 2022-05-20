import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import { CardFooter } from "@material-tailwind/react";
import UploadFiles from "components/FilesUpload.component";
import Image from "@material-tailwind/react/Image";
import { useEffect, useState } from "react";
import uploadFilesService from "services/upload-files.service";
import defaultImg from "assets/img/default-avatar.png";
import { Typography } from "@material-ui/core";
import api from "../../utils/config";

export default function UploadForm(props) {
  const [imageSrc, setImageSrc] = useState(defaultImg);
  useEffect(() => {
    getPassport();
  }, []);

  const getPassport = () => {
    uploadFilesService.getFiles("Passport").then((response) => {
      if (response.data.filepath)
        setImageSrc(`${api.API_URL}/${response.data.filepath}`);
      else setImageSrc(defaultImg);
    });
  };
  return (
    <Card>
      <CardHeader color="orange" contentPosition="none" size="sm">
        <div className="w-full flex items-center justify-between">
          <h6 className="text-lg">Upload Documents</h6>
          <h6 className="text-sm">
            Step {props.currentStep} of {props.totalSteps}
          </h6>
        </div>
      </CardHeader>
      <CardBody>
        <form>
          {/* <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
            User Information
          </h6> */}
          <div className="grid grid-cols-2 mt-10 ml-10 pb-10">
            <div className="col-span-2 mb-3">
              <Image src={imageSrc} style={{ width: 120, height: 120 }} />
            </div>

            <div className="grid-cols-8">
              <UploadFiles
                title="Recent Passport"
                docType="Passport"
                getPassport={getPassport}
              />
            </div>
            <hr />
          </div>

          <div className="flex flex-wrap mt-10">
            <UploadFiles title="SSCE Result" docType="SSCE" />
          </div>
          <div className="flex flex-wrap mt-10">
            <UploadFiles title="A-Level Result" docType="A-Level" />
          </div>
          <div className="flex flex-wrap mt-10">
            <UploadFiles title="Admission Letter" docType="Admission-letter" />
          </div>
          <div className="flex flex-wrap mt-10">
            <UploadFiles
              title="LGA Letter of Identification"
              docType="Letter-of-id-lga"
            />
          </div>
        </form>

        <div>
          {/* 
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
      <CardFooter className="mt-20">
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
