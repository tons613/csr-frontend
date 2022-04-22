import React from "react";
import StepWizard from "react-step-wizard";
import ContactForm from "components/ApplicationForms/ContactForm";
import InstitutionForm from "components/ApplicationForms/InstitutionForm";
import TestCenterForm from "components/ApplicationForms/TestCenterForm";
import UploadForm from "components/ApplicationForms/UploadForm";
import FormSummary from "components/ApplicationForms/FormSummary";

function Dashboard() {
  const finishButtonClick = (allStates) => {
    console.log(allStates);
  };
  return (
    <>
      <div className="px-3 md:px-8 h-auto " style={{ minHeight: "807px" }}>
        <div className="container mx-auto max-w-full">
          <div className="w-10/12 mx-auto">
            <div className="xl:col-start-2 xl:col-end-5 px-4 mb-16">
              <StepWizard isHashEnabled={true}>
                <ContactForm hashKey={"contactInfo"} />
                <InstitutionForm hashKey={"Institution"} />
                <TestCenterForm hashKey={"TestVenue"} />
                <UploadForm hashKey={"Uploads"} />
                <FormSummary hashKey={"Summary"} />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
