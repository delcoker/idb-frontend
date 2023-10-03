import React, {ReactElement} from 'react';
import Dashboard from "../pages/dashboard/Dashboard";
import Logout from "../pages/logout/Logout";
import EmployeesPage from "../pages/employees/EmployeesPage";
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {CategorySharp, ListAltTwoTone, LogoutOutlined} from "@mui/icons-material";
import ViewAlertsPage from "../pages/alerts/ViewAlertsPage";

export interface Route {
  path: string;
  element: ReactElement;
  toast?: string;
  name: string;
  icon: ReactElement;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    toast: "Discover interesting stats right here",
    name: "Dashboard",
    icon: <BarChartIcon />
  },
  {path: '/alerts', element: <ViewAlertsPage />, toast: "Look out", name: "Reports", icon: <AssignmentIcon />},
  {path: '/employees', element: <EmployeesPage />, toast: "People", name: "Employees", icon: <PeopleIcon />},
  {path: '/logout', element: <Logout />, toast: "Bye Bye", name: "Logout", icon: <LogoutOutlined />},
];

export default routes;
