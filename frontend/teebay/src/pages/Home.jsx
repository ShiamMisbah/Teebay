import { Box, Container } from '@mui/material';
import React from 'react'
import Heading from "../components/Heading";
import ProductCard from '../components/ProductCard';
import { GET_ALL_PRODUCTS } from '../queries/productQueries';
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;  
  console.log(data);
  

  return (
    <Container maxWidth="100%">
      <Heading title={"ALL PRODUCTS"} />
      <Box display="flex" flexDirection="column" p={3}>
        {data.getProducts && data.getProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </Box>
    </Container>
  );
}

export default Home