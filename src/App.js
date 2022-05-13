import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardLayout from "layouts/Dashboard.js";
import AuthLayout from "layouts/Auth.js";
import IndexLayout from "layouts/Index";
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";

function App() {
  return (
    <>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route
          path="/dashboard"
          render={(props) => <DashboardLayout {...props} />}
        />
        {/* <Route exact path="/" render={(props) => <IndexLayout {...props} />} /> */}
        <Redirect from="/" to="/dashboard" />
        <Redirect from="*" to="/" />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
