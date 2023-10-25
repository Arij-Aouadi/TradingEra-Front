import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { Link } from 'react-router-dom';



export const adminListItems = (
    <React.Fragment>
      <ListItemButton component={Link} to="/adminDashboard">
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/manageUsers">
        <ListItemIcon>
          <PeopleAltOutlinedIcon  />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>
      <ListItemButton component={Link} to="/approveRequests">
        <ListItemIcon>
          <LocalShippingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Shipments Requests" />
      </ListItemButton>
    </React.Fragment>
  );

  export const courierListItems = (
    <React.Fragment>
      <ListItemButton component={Link} to="/courierDashboard">
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard"  />
      </ListItemButton>
      <ListItemButton component={Link} to="/assignments">
        <ListItemIcon>
          <AssignmentOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Shipments" />
      </ListItemButton>
      <ListItemButton component={Link} to="/courierShipments">
        <ListItemIcon>
          <LocalShippingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="My Shipments" />
      </ListItemButton>
    </React.Fragment>
  );

  export const employeeListItems = (
    <React.Fragment>
      <ListItemButton component={Link} to="/Home"  >
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/makeRequest">
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Make a Request" />
      </ListItemButton>
      <ListItemButton component={Link} to="/assignShipment">
        <ListItemIcon>
          <LocalShippingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="My Shipments" />
      </ListItemButton>
    </React.Fragment>
  );

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);