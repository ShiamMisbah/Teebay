import { Box, Modal, Typography, Grid2, Button } from '@mui/material';
import React, { useState } from 'react'
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useAuthContext } from '../context/AuthContext';
import { useMutation } from '@apollo/client';
import { CREATE_RENT_PRODUCTS } from '../queries/rentProductQueries';

const RentModal = ({ open, setOpen, productData }) => {
  const { authUser } = useAuthContext();
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [rentData, setRentData] = useState({
    rentedUserId: Number(authUser.id),
    dateEnd: null,
    dateStart: null,
    originalUserId: Number(productData.user.id),
    productId: Number(productData.id),
  });
  const [rentProducts, { data, loading, error }] = useMutation(CREATE_RENT_PRODUCTS)
  const handleClose = () => setOpen(false);

  const handleDateChangeFrom = (newValue) => {
    setSelectedDateFrom(newValue);
    setRentData((prevState) => ({
      ...prevState,
      dateStart: new Date(newValue).toISOString()
    }));
  };

  const handleDateChangeTo = (newValue) => {
    setSelectedDateTo(newValue);
    setRentData((prevState) => ({
      ...prevState,
      dateEnd: new Date(newValue).toISOString()
    }));
  };

  const handleSubmit = async () => {
    try {
      await rentProducts({
        variables: { input: { ...rentData } },
      });
      if (data) {
        if (data.createRentedProduct) {
            alert('Product Renting successful')
        } else {
            alert("Product Renting failed");
        }
      }
    } catch (err) {
      console.error("Unexpected Error:", err.message);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Rental Period
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  views={["year", "month", "day", "hours"]}
                  viewRenderers={{
                    minutes: null,
                    seconds: null,
                  }}
                  label="From"
                  value={selectedDateFrom}
                  onChange={handleDateChangeFrom}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
          <Grid2 size={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  views={["year", "month", "day", "hours"]}
                  viewRenderers={{
                    minutes: null,
                    seconds: null,
                  }}
                  label="To"
                  value={selectedDateTo}
                  onChange={handleDateChangeTo}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
        </Grid2>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={5}>
          <Button onClick={handleSubmit} variant="contained">
            CONFIRM
          </Button>
          <Button onClick={handleClose} color="error" variant="contained">
            GO BACK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RentModal