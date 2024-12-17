import { Box, Container } from '@mui/material';
import React from 'react'
import Heading from "../components/Heading";
import ProductCard from '../components/ProductCard';
import { GET_ALL_PRODUCTS } from '../queries/productQueries';
import { useQuery } from '@apollo/client';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const {authUser} = useAuthContext()
  var filteredList;

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const filterProducts = (userID, productList) => {
    console.log(userID, productList);
    const filterList = productList.filter(x => x.user.id !== userID)
    return filterList;
  };

  if (data){
    if (data.getProducts){
      filteredList = filterProducts(authUser.id, data.getProducts)
      console.log(filteredList);
      
    }
  }

  return (
    <Container maxWidth="100%">
      <Heading title={"ALL PRODUCTS"} />
      <Box display="flex" flexDirection="column" p={3}>
        {filteredList && filteredList.map((product) => <ProductCard key={product.id} product={product} />)}
      </Box>
    </Container>
  );
}

export default Home