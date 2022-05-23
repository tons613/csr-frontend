import React, { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import ContactForm from "components/ApplicationForms/ContactForm";
import InstitutionForm from "components/ApplicationForms/InstitutionForm";
import TestCenterForm from "components/ApplicationForms/TestCenterForm";
import UploadForm from "components/ApplicationForms/UploadForm";
import FormSummary from "components/ApplicationForms/FormSummary";
import axios from "axios";
import api from "../utils/config";
import MyApplicationInfo from "components/ApplicationForms/MyApplicationInfo";

function Dashboard() {
  const finishButtonClick = (allStates) => {
    console.log(allStates);
  };
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    axios
      .get(api.API_URL + "/api/UserProfile", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        setUser(result.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };
  return (
    <>
      <div className="lg:px-8 h-auto " style={{ minHeight: "807px" }}>
        <div className="container mx-auto max-w-full">
          <div className="lg:w-10/12 mx-auto">
            <div className="xl:col-start-2 xl:col-end-5 lg:px-4 mb-16">
              {loading ? null : user.registrationStatus === "2" ? (
                <StepWizard isHashEnabled={true} isLazyMount={true}>
                  <ContactForm hashKey={"contactInfo"} />
                  <InstitutionForm hashKey={"Institution"} />
                  <TestCenterForm hashKey={"TestVenue"} />
                  <UploadForm hashKey={"Uploads"} />
                  <FormSummary hashKey={"Summary"} />
                </StepWizard>
              ) : (
                <MyApplicationInfo />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
