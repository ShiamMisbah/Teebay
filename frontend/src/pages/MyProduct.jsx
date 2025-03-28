import { Box, Button, Container } from '@mui/material';
import React from 'react'
import Heading from "../components/Heading";
import ProductCard from '../components/ProductCard';
import { GET_MY_PRODUCTS } from '../queries/productQueries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

const MyProduct = () => {
  const { authUser } = useAuthContext();  
  const { loading, error, data } = useQuery(GET_MY_PRODUCTS, {
    variables: { userId : Number(authUser.id) },
  });
  const navigate = useNavigate()
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;  

  return (
    <Container maxWidth="100%">
      <Heading title={"MY PRODUCTS"} />
      <Box display="flex" flexDirection="column" p={3}>
        {data.getUserProducts &&
          data.getUserProducts.map((product) => (
            <ProductCard key={product.id} product={product} isMy={true} />
          ))}
        <Button
          onClick={() => navigate("/productForm")}
          sx={{ width: "150px", alignSelf: "end" }}
          variant="contained"
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
}

export default MyProduct