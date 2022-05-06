import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// reactstrap components

// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/index") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <Switch>{this.getRoutes(routes)}</Switch>
        {/* <AuthFooter /> */}
      </>
    );
  }
}

export default Auth;
