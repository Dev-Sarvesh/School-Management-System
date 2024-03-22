import Dashboard from "layouts/views/Dashboard.js";
import TableList from "layouts/views/TableList.js";
import Subjects from "layouts/views/Subject/Subjects.js";
import Class from "layouts/views/class/Class.js";
import Student from "layouts/views/student/Student";
import Teacher from "layouts/views/teacher/addTeacher"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },

  {
    path: "/subjects",
    name: "Subjects",
    icon: "nc-icon nc-atom",
    component: Subjects,
    layout: "/admin",
  },
  {
    path: "/class",
    name: "Classes",
    icon: "nc-icon nc-paper-2",
    component: Class,
    layout: "/admin",
  },
  {
    path: "/student",
    name: "Students",
    icon: "nc-icon nc-circle-09",
    component: Student,
    layout: "/admin",
  },
  {
    path: "/teacher",
    name: "Teacher",
    icon: "nc-icon-dark nc-circle-09",
    component: Teacher,
    layout: "/admin",
  },
  
 
];

export default dashboardRoutes;
