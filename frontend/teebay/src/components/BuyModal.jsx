import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client";
import { CREATE_SOLD_PRODUCTS } from "../queries/buyProductQueries";

const BuyModal = ({ open, setOpen, productData }) => {
  const handleClose = () => setOpen(false);
  const {authUser} = useAuthContext()
  const [sellProducts, { data, loading, error }] = useMutation(CREATE_SOLD_PRODUCTS)
  const [buyData, setBuyData] = useState({
    boughtUserId: Number(authUser.id),
    dateSold: new Date().toISOString(),
    originalUserId: Number(productData.user.id),
    productId: Number(productData.id),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = async () => {
    try {
        await sellProducts({
          variables: { input:{...buyData} },
        });
        if (data) {
          if (data.createSoldProduct) {
            alert("Product Buying successful");
          } else {
            alert("Product Buying failed");
          }
        }
      } catch (err) {
          console.error("Unexpected Error:", err.message);
      }
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to buy this product?
        </Typography>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={5}>
          <Button onClick={handleSubmit} variant="contained">
            YES
          </Button>
          <Button onClick={handleClose} color="error" variant="contained">
            NO
          </Button>
        </Box>
        
      </Box>
    </Modal>
  );
};

export default BuyModal;
