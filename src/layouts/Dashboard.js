import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import isEmpty from "lodash/isEmpty";

import routes from "routes.js";
import { connect } from "react-redux";
// import { signOut } from "store/actions/authActions";
// import PageLoader from "components/Pages/PageLoader";
import Sidebar from "components/Sidebar";
import background from "assets/img/landing.png";
import loader from "assets/img/loader.gif";

const Dashboard = (props) => {
  const [showSidebar, setShowSidebar] = useState("-left-64");

  // componentDidUpdate(e) {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.mainContent.scrollTop = 0;
  //   this.checkAuth();
  // }
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const checkAuth = () => {
    const { isAuthenticated, currentUser, loading } = props.auth;
    console.log("ddddds", loading);
    if (!loading && !isAuthenticated && isEmpty(currentUser)) {
      props.history.push("/auth/login");
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    checkAuth();
  });

  // componentDidMount = () => {
  //   this.checkAuth();
  // };
  if (props.auth.loading)
    return (
      <div>
        <img
          src={loader}
          style={{
            width: 100,
            marginTop: 100,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        />
      </div>
    );
  return (
    <>
      <Sidebar {...props} />
      <div
        className="bg-gray-200 pt-14 pb-28 px-3 md:px-8 h-auto md:ml-64"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto max-w-full">
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signout: () => dispatch(signOut()),
//   };
// };

// export default Dashboard;
export default connect(mapStateToProps)(Dashboard);
