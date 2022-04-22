import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import isEmpty from "lodash/isEmpty";

import routes from "routes.js";
// import { connect } from "react-redux";
// import { signOut } from "store/actions/authActions";
// import PageLoader from "components/Pages/PageLoader";
import Sidebar from "components/Sidebar";
import background from "assets/img/landing.png";
const Admin = (props) => {
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
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  // checkAuth = () => {
  //   const { isAuthenticated, currentUser, loading } = this.props.currentUser;
  //   if (!loading && !isAuthenticated && isEmpty(currentUser)) {
  //     this.props.history.push("/auth/login");
  //   }
  // };

  // componentDidMount = () => {
  //   this.checkAuth();
  // };
  // if (this.props.currentUser.loading)
  //   return (
  //     <div
  //       style={{
  //         width: "100%",
  //         textAlign: "center",
  //         marginTop: 100,
  //       }}
  //     >
  //       <img style={{ width: 50 }} src={require("assets/img/loader.gif")} />
  //     </div>
  //   );
  return (
    <>
      <Sidebar {...props} />
      <div
        className="bg-gray-200 pt-14 pb-28 px-3 md:px-8 h-auto"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto max-w-full">
          {/* <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            /> */}
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => ({
//   currentUser: state.auth,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signout: () => dispatch(signOut()),
//   };
// };

export default Admin;
// export default connect(mapStateToProps, mapDispatchToProps)(Admin);
