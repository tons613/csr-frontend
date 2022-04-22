// import Index from "views/Index.js";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import ApplicationForm from "pages/Application";
import Footer from "components/Footer";
import Landing from "pages/Landing";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Register from "pages/Register";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-compass-04",
    component: Dashboard,
    layout: "/dashboard",
  },
  {
    path: "/Application",
    name: "Application",
    icon: "ni ni-money-coins",
    component: ApplicationForm,
    layout: "/dashboard",
  },
  {
    path: "/profile",
    name: "Account Profile",
    icon: "ni ni-single-02",
    component: Profile,
    layout: "/dashboard",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-support-16",
    component: Settings,
    layout: "/dashboard",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-support-16",
    component: Tables,
    layout: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  // {
  //   path: "/verify",
  //   name: "Email Verification",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: EmailVerification,
  //   layout: "/auth",
  // },
];
export default routes;
