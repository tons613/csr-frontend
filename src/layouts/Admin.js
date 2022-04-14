import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import isEmpty from "lodash/isEmpty";

import routes from "routes.js";
import { connect } from "react-redux";
import { signOut } from "store/actions/authActions";
import PageLoader from "components/Pages/PageLoader";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
    this.checkAuth();
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return ""; //return "Brand";
  };

  constructor(props) {
    super();
  }

  checkAuth = () => {
    const { isAuthenticated, currentUser, loading } = this.props.currentUser;
    if (!loading && !isAuthenticated && isEmpty(currentUser)) {
      this.props.history.push("/auth/login");
    }
  };

  componentDidMount = () => {
    this.checkAuth();
  };
  render() {
    if (this.props.currentUser.loading)
      return (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 100,
          }}
        >
          <img style={{ width: 50 }} src={require("assets/img/loader.gif")} />
        </div>
      );
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/dashboard",
            imgSrc: require("assets/img/brand/logo2.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
