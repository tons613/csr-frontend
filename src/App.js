import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from "pages/Tables";
import Footer from 'components/Footer';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="md:ml-64">
        <Switch>
          {/* <Route exact path="/" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/Application" component={ApplicationForm} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} /> */}

          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/" />
          <Redirect from="/" to="/dashboard" />
        </Switch>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
