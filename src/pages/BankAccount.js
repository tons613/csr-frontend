import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Radio from "@material-tailwind/react/radio";
import { CardFooter } from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import api from "../utils/config";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PostTestCenter } from "../redux/actions/ApplicationActions";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

export default function BankAccount(props) {
  const [userData, setUserData] = useState({});
  const [accountNo, setAccountNo] = useState("");
  const [bankname, setBankname] = useState("");
  const [acctname, setAcctname] = useState("");
  const [bankcode, setBankcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [svloading, setSvLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [banklist, setBanklist] = useState([]);
  const [validated, setValidated] = useState(false);
  const [hasAcct, setHasAcct] = useState(false);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    axios
      .get(api.API_URL + "/api/getbankaccout", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => {
        if (result.data.registrationStatus !== 6) {
          props.history.push("/dashboard");
        }
        var acct = result.data.acct;
        if (acct !== null) {
          console.log("acct", acct);
          setHasAcct(true);
          setAcctname(acct.accountName);
          setAccountNo(acct.accountNumber);
          setBankname(acct.bankName);
        } else {
          setHasAcct(false);
        }

        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
        }
      });
  };

  const createBankOptions = (data) => {
    let options = [];
    data &&
      data.map((data) => options.push({ value: data.code, label: data.name }));
    setBanklist(options);
  };

  const handleValidate = (e) => {
    e.preventDefault();
    setLoading(true);
    var data = { AccountNo: accountNo, BankCode: bankcode };
    axios
      .post(`${api.API_URL}/api/validatebank`, {
        AccountNo: accountNo,
        BankCode: bankcode,
      })
      .then((result) => {
        setLoading(false);
        console.log(result.data);
        setAcctname(result.data.data.account_name);
        setErrMsg(null);
        setValidated(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        if (error.response) {
          setErrMsg(error.response.data.message);
        } else {
          setErrMsg(
            "An Error ocurred. Request could not be processed. Please try again later"
          );
        }
      });
  };
  const handleSave = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to edit this after submission!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSvLoading(true);
        axios
          .post(
            `${api.API_URL}/api/savebank`,
            {
              AccountNumber: accountNo,
              AccountName: acctname,
              BankName: bankname,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((result) => {
            setSvLoading(false);
            console.log(result.data);
            setErrMsg(null);
            setHasAcct(true);
          })
          .catch((error) => {
            setSvLoading(false);
            console.log(error.response);
            if (error.response) {
              setErrMsg(error.response.data.message);
            } else {
              setErrMsg(
                "An Error ocurred. Request could not be processed. Please try again later"
              );
            }
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://api.paystack.co/bank")
      .then((result) => {
        // console.log(result.data.data);
        createBankOptions(result.data.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className="h-auto lg:w-9/12 mx-auto " style={{ minHeight: "807px" }}>
      <div className="container mx-auto max-w-full">
        <div className="lg:w-10/12 mx-auto">
          <div className="xl:col-start-2 xl:col-end-5 lg:px-4 mb-16"></div>
          <Card>
            <CardHeader color="orange" contentPosition="none" size="sm">
              <div className="w-full flex items-center justify-between">
                <h6 className="text-lg">ADD BANK ACCOUNT</h6>
              </div>
            </CardHeader>
            <CardBody>
              {errMsg && errMsg !== "" && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 mx-5"
                  role="alert"
                >
                  <span className="text-sm block sm:inline">{errMsg}</span>
                </div>
              )}{" "}
              {!hasAcct ? (
                <>
                  <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                    Provide your bank account information.
                  </h6>
                  <div className="flex flex-wrap mt-10">
                    <div className="w-full lg:w-5/12 pr-4 mb-10 font-dark">
                      <Select
                        options={banklist}
                        placeholder="Select Bank name"
                        // value={banklist.filter(
                        //   (option) => option.value === userData?.firstTestCenter
                        // )}
                        onChange={(e) => {
                          setBankcode(e.value);
                          setBankname(e.label);
                        }}
                        isDisabled={validated}
                      />
                    </div>
                    <div className="w-full lg:w-3/12 pr-4 mb-10 font-dark">
                      <Input
                        max="2010-12-31"
                        placeholder="Account number"
                        outline={true}
                        type="number"
                        value={accountNo}
                        disabled={validated}
                        onChange={(e) => setAccountNo(e.target.value)}
                      />
                    </div>
                    <div className="w-full lg:w-4/12  mb-10 font-dark ">
                      <Button
                        color={validated ? "gray" : "orange"}
                        onClick={handleValidate}
                        disabled={validated}
                      >
                        {!loading ? (
                          "Validate"
                        ) : (
                          <>
                            Validating...{" "}
                            <i className="fa fa-spinner fa-2x fa-spin"></i>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {validated && (
                    <div className="flex flex-wrap ">
                      <div className="w-full lg:w-8/12 pr-4 mb-10 font-dark">
                        <span className="text-green-700 font-bold">
                          {acctname}
                        </span>
                      </div>

                      <div className="w-full lg:w-6/12 flex flex-row ">
                        <Button color="green" size="sm" onClick={handleSave}>
                          {!svloading ? (
                            "SAVE"
                          ) : (
                            <>
                              Saving...{" "}
                              <i className="fa fa-spinner fa-2x fa-spin"></i>
                            </>
                          )}
                        </Button>
                        <Button
                          color="orange"
                          className="ml-2"
                          size="sm"
                          onClick={() => setValidated(false)}
                        >
                          Change
                        </Button>
                      </div>
                      <div className="w-full lg:w-3/12  "></div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                    Bank account information.
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-3/12 pr-4 mb-1 font-dark">
                      Account Name:
                    </div>
                    <div className="w-full lg:w-7/12 pr-4 mb-1 font-bold text-gray-800">
                      {acctname}
                    </div>
                  </div>
                  <div className="flex flex-wrap ">
                    <div className="w-full lg:w-3/12 pr-4 mb-1 font-dark">
                      Account Number:
                    </div>
                    <div className="w-full lg:w-3/12 pr-4 mb-1 font-bold text-gray-800">
                      {accountNo}
                    </div>
                  </div>
                  <div className="flex flex-wrap ">
                    <div className="w-full lg:w-3/12 pr-4 mb-1 font-dark">
                      Bank Name:
                    </div>
                    <div className="w-full lg:w-3/12 pr-4 mb-1 font-bold text-gray-800">
                      {bankname}
                    </div>
                  </div>
                  <div className=" mt-20">
                    <span className="text-red-500 text-sm">
                      If need to change your bank details, send an email to
                      support@to.....
                    </span>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
