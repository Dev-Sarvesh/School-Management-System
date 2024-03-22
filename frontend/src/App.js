import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./components/Form/Login";
import SignUp from "./components/Form/SignUp";
import NewRegistration from "./components/Form/NewRegistration";

import AdminLayout from "./layouts/Admin.js";
import User from "./layouts/User";
import SubjectForm from "./layouts/views/Subject/SubjectForm";
import ClassForm from "./layouts/views/class/ClassForm";
import StudentForm from "./layouts/views/student/studentForm"
import EditUserForm from "./components/Form/EditUserForm";

const App = () => {
  return (
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/user" component={User} />{" "}{/* Ensure this route is before the "/" route */}
      <Route path="/addSubject" component={SubjectForm} />
      <Route path="/classForm" component={ClassForm} />
      <Route path="/addStudent" component={StudentForm}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/edituser/:id" component={EditUserForm} />
      <Route path="/newRegistration" component={NewRegistration} />
      <Route path="/login" component={Login } />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default App;
