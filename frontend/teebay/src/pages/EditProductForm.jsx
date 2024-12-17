import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PRODUCTS_BY_ID, UPDATE_PRODUCTS } from '../queries/productQueries';
import { Box, Button, Grid2, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Heading from '../components/Heading';

const EditProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { getProductById: Number(id) },
  });
  const [
    updateProduct,
    { data: updatedData, loading: updatedLoading, error: updatedError },
  ] = useMutation(UPDATE_PRODUCTS);

  let productData = {}
  if (data) {    
    if (data.getProductById){
      productData = data.getProductById
    }
  }

  const onSubmit = async (data) => {
    try {
      await updateProduct({
        variables: {
          updateProductId: Number(id),
          input: data
        },
      });
      navigate("/myProduct");
      alert('Product Updated.')
    } catch (err) {
    console.error("Unexpected Error:", err.message);
    }
  }
    
  const { control, reset, handleSubmit} = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      rent: "",
      rentOption: "",
    },
  });

  useEffect (() => {
    reset({
      title: productData?.title || "",
      description: productData?.description || "",
      category: productData?.category || [],
      price: productData?.price || "",
      rent: productData?.rent || "",
      rentOption: productData?.rentOption || "",
    });
  }, [reset, productData])


  const categories = [
    "ELECTRONICS",
    "FURNITURE",
    "HOME APPLIANCES",
    "SPORTING GOODS",
    "OUTDOOR",
    "TOYS",
  ];

  if (loading){
    return (
      <div>...Loading</div>
    )
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Box>
      <Heading title={"Update Product"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Controller
              name="category"
              control={control}
              defaultValue={productData?.category || []} // Set the default value
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Categories"
                  fullWidth
                  margin="normal"
                  SelectProps={{
                    multiple: true,
                    value: field.value || [], // Default to an empty array if no value
                    onChange: (event) => field.onChange(event.target.value),
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  label="Description"
                  style={{
                    padding: "10px",
                    height: "200px",
                    width: "98%",
                    fontSize: "24px",
                    marginBottom: "15px",
                  }}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={4}>
            <Controller
              name="rent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rent"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={4}>
            <Controller
              name="rentOption"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  variant="outlined"
                  fullWidth
                  required
                  displayEmpty
                >
                  <MenuItem value="HOURLY">Per Hour</MenuItem>
                  <MenuItem value="DAILY">Per Day</MenuItem>
                  <MenuItem value="WEEKLY">Per Month</MenuItem>
                  <MenuItem value="MONTHLY">Per Month</MenuItem>
                  <MenuItem value="YEARLY">Per Year</MenuItem>
                </Select>
              )}
            />
          </Grid2>
        </Grid2>
        <Grid2
          mt={2}
          container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="end"
          spacing={3}
        >
          <Grid2>
            <Button type="submit" variant="contained">
              Update Product
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
}

export default EditProductForm