// import Index from "views/Index.js";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import ApplicationForm from "pages/Application";
import BankAccount from "pages/BankAccount";
import Landing from "pages/Landing";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Register from "pages/Register";
import PrintSlip from "pages/PrintSlip.js";
import ChangePassword from "pages/ChangePassword";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";

var routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-circle-08 text-pink",
    component: Landing,
    layout: "/index",
  },
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-compass-04",
    component: Dashboard,
    // component: Dashboard,
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
    path: "/examSlip",
    component: PrintSlip,
    name: "Exam Slip",
    layout: "/dashboard",
    icon: "ni ni-money-coins",
  },
  {
    path: "/profile",
    name: "Account Profile",
    icon: "ni ni-single-02",
    component: Settings,
    layout: "/dashboard",
  },
  {
    path: "/bank-account",
    name: "Bank Details",
    icon: "ni ni-support-16",
    component: BankAccount,
    layout: "/dashboard",
  },
  {
    path: "/change-password",
    name: "Support",
    icon: "ni ni-support-16",
    component: ChangePassword,
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
    path: "/forgot-password",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth",
  },
  {
    path: "/reset-password",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: ResetPassword,
    layout: "/auth",
  },
  {
    path: "/apply",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/home",
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
