import { Box, Container } from '@mui/material';
import React from 'react'
import Heading from "../components/Heading";
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <Container maxWidth="100%">
      <Heading title={'ALL PRODUCTS'} />
      <Box display='flex' flexDirection='column' p={3}>
        <ProductCard />
      </Box>
    </Container>
  );
}

export default Home