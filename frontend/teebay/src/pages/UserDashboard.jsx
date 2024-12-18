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

const UserDashboard = () => {
    const { authUser } = useAuthContext()
    // const {
    //   data: borrowedData,
    //   loading: borrowedLoading,
    //   error: borrowedError,
    // } = useQuery();
    const {
      data: boughtData,
      loading: boughtLoading,
      error: boughtError,
    } = useQuery(GET_BOUGHT_PRODUCTS, {
      variables: { boughtUserId: Number(authUser.id) },
    });

    console.log(boughtData);
    
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    if (boughtLoading) {
      return <div>...Loading</div>;
    }
    if (boughtError) {
      return <div>{boughtError.message}</div>;
    }
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
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Item Four</TabPanel>
          </TabContext>
        </Box>
      </Box>
    );
}

export default UserDashboard