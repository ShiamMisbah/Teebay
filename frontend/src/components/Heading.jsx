import { Box, Typography } from '@mui/material';
import React from 'react'

const Heading = ({ title }) => {
  return (
    <Box mt="50px" mb="10px" textAlign='center'>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Heading