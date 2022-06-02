import { Card, CardBody, CardHeader, Progress } from "@material-tailwind/react";
import { format } from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const { currentUser } = props.auth;
  return (
    Object.entries(currentUser).length > 0 && (
      <>
        <div className="lg:px-8 h-auto " style={{ minHeight: "807px" }}>
          <div className="container mx-auto max-w-full">
            <div className="lg:w-10/12 mx-auto">
              <div className="xl:col-start-2 xl:col-end-5 lg:px-4 mb-16">
                <Card>
                  {/* <CardHeader color="gray" contentPosition="left">
                  <h2 className="text-white text-2xl">Card Table</h2>
                </CardHeader> */}

                  <CardBody>
                    <div className="overflow-x-auto">
                      <h2 className="text-gray-700 mb-5">
                        Existing Application
                      </h2>
                      <table className="items-center w-full bg-transparent border-collapse border border-slate-500">
                        <thead>
                          <tr>
                            {currentUser.applicationNo !== null && (
                              <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                APPLICATION No.
                              </th>
                            )}
                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                              FULLNAME
                            </th>

                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                              STATUS
                            </th>
                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                              DATE UPDATED
                            </th>
                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                              ACTION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {currentUser.applicationNo !== null && (
                              <th className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 font-bold text-left">
                                <Link to="/dashboard/Application">
                                  {" "}
                                  {currentUser.applicationNo}
                                </Link>
                              </th>
                            )}

                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <Link to="/dashboard/Application">
                                {currentUser.lastName} {currentUser.firstName}
                              </Link>
                            </th>

                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {currentUser.registrationStatus === 1 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-teal-500 mr-2"></i>{" "}
                                  Submitted, awaiting verification
                                </>
                              ) : currentUser.registrationStatus === 2 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                                  Awaiting Completetion and Submission
                                </>
                              ) : currentUser.registrationStatus === 3 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-green-500 mr-2"></i>{" "}
                                  Validated
                                </>
                              ) : currentUser.registrationStatus === 4 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-red-500 mr-2"></i>{" "}
                                  Rejected
                                </>
                              ) : currentUser.registrationStatus === 5 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-green-500 mr-2"></i>{" "}
                                  Awarded, Awaiting Acceptance
                                </>
                              ) : currentUser.registrationStatus === 6 ? (
                                <>
                                  <i className="fas fa-circle fa-sm text-green-500 mr-2"></i>{" "}
                                  SCHOLARSHIP AWARDED
                                </>
                              ) : (
                                <>N/A</>
                              )}
                              {/* <Progress color="red" value="60" /> */}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {format(
                                new Date(currentUser?.dateUpdated?.toString()),
                                "dd/MM/yyyy hh:mm a"
                              )}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <div className="flex text-teal-500">
                                {currentUser.registrationStatus === 5 ? (
                                  <Link to="/dashboard/Acceptance">
                                    Accept Award
                                  </Link>
                                ) : currentUser.registrationStatus === 3 ? (
                                  <Link to="/dashboard/examSlip">
                                    Print Slip
                                  </Link>
                                ) : (
                                  <Link to="/dashboard/Application">
                                    {currentUser.registrationStatus === 2
                                      ? "Continue Application"
                                      : "View Application"}
                                  </Link>
                                )}
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
