import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import Heading from '../components/Heading';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_ID } from '../queries/productQueries';

const ProductProfile = () => {
    const {id} = useParams()
    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { getProductById: Number(id) },
    });
    console.log(data);
  
  if (loading) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

    let product = {};
    if (data) {
        if (data.getProductById) {
        product = data.getProductById;
        }
    }

    const handleAction = (id, action) => {
        console.log(id, action);
        
    }
    
    return (
      <Box>
        <Heading title={"View Product"} />
        <Box>
          <Typography gutterBottom variant="h5" sx={{ color: "text.primary" }}>
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Categories: {product.category.join(", ")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }}>
            Price: $ {product.price} | Rent: $ {product.rent}{" "}
            {product.rentOption}
          </Typography>
          <Box>
            <Typography variant="body2" gutterBottom>
              {product.description}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ color: "text.secondary" }}
            mt={3}
          >
            <Typography variant="body2">
              Posted At {product.createdAt}
            </Typography>
          </Box>
          <Typography variant="body2">
            Posted BY {product.user.firstName} {product.user.lastName}
          </Typography>
        </Box>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={5}>
          <Button
            onClick={() => handleAction(product.id, "buy")}
            variant="contained"
          >
            BUY Product
          </Button>
          <Button onClick={() =>handleAction(product.id, "rent")} variant="contained">
            RENT Product
          </Button>
        </Box>
      </Box>
    );
}

export default ProductProfile