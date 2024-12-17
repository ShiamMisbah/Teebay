import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { DELETE_PRODUCTS } from "../queries/productQueries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product, isMy=false }) => {
  const navigate = useNavigate()
  const [deleteProduct, { data: productData, loading, error }] = useMutation(DELETE_PRODUCTS);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleToggle = () => {
    console.log(product.description);
  };


  const handleCardClick = (id) => {
    if (isMy){
      navigate(`/editProduct/${id}`);
    } else {
      navigate(`/viewProduct/${id}`);
    }
  }

  const handleDeleteProduct = (productID) => {
    deleteProduct({
      variables: {deleteProductId: productID,}
    });
    if (productData) {
      console.log(productData);
      alert(productData.deleteProduct.message);
    }
    handleClose()
  }

  return (
    <Box mb={2}>
      <Card
        sx={{
          border: "1px solid gray",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={() => handleCardClick(product.id)}
      >
        {isMy && (
          <IconButton
            onClick={handleOpen}
            aria-label="delete"
            sx={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <CardContent>
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
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Set the number of lines for truncation
              }}
            >
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
            <Typography variant="body2">123456 Views</Typography>
          </Box>
          <Typography variant="body2">
            Posted BY {product.user.firstName} {product.user.lastName}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this product?
          </Typography>
          <Box display='flex' justifyContent='space-between' mt={3}>
            <Button onClick={()=>handleDeleteProduct(product.id)} variant="contained" color="error">Yes</Button>
            <Button onClick={handleClose} variant="contained" color="info">No</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCard;
