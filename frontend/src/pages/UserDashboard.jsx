import { Box } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../components/Heading'
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useQuery } from '@apollo/client';
import { GET_BOUGHT_PRODUCTS } from '../queries/buyProductQueries';
import { useAuthContext } from '../context/AuthContext';
import BoughtData from '../components/BoughtData';
import SoldData from '../components/SoldData';
import BorrowedData from '../components/BorrowedData';
import LentData from '../components/LentData';

const UserDashboard = () => {
    
    // const {
    //   data: borrowedData,
    //   loading: borrowedLoading,
    //   error: borrowedError,
    // } = useQuery();
    
    
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
      <Box>
        <Heading title="MY DASHBOARD" />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Tab label="BOUGHT" value="1" />
                <Tab label="SOLD" value="2" />
                <Tab label="BORROWED" value="3" />
                <Tab label="LENT" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1"><BoughtData /></TabPanel>
            <TabPanel value="2"><SoldData /></TabPanel>
            <TabPanel value="3"> <BorrowedData /> </TabPanel>
            <TabPanel value="4"> <LentData /> </TabPanel>
          </TabContext>
        </Box>
      </Box>
    );
}

export default UserDashboard