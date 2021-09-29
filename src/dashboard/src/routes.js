import Index from "views/Index";
import Login from "views/examples/Login.js";
import Register from "views/examples/Register.js";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import CreateApp from "./views/app/CreateApp";
import EditApp from "./views/app/EditApp";
import TestProfile from "./views/examples/Profile";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    displayMenu: 1
  },
  {
    path: "/create-app",
    name: "Create app",
    icon: "ni ni-tv-2 text-primary",
    component: CreateApp,
    layout: "/admin",
    displayMenu: 0
  },
  {
    path: "/edit-app/:token",
    name: "Create app",
    icon: "ni ni-tv-2 text-primary",
    component: EditApp,
    layout: "/admin",
    displayMenu: 0
  },
  {
    path: "/test-profile",
    name: "Profile",
    icon: "fas fa-user",
    component: TestProfile,
    layout: "/admin",
    displayMenu: 0
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgot-password",
    name: "Forgot-Password",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/reset-password/:token",
    name: "Reset password",
    icon: "ni ni-circle-08 text-pink",
    component: ResetPassword,
    layout: "/auth"
  }
];
export default routes;
