import { Box, Button, MenuItem, Select, TextareaAutosize, TextField, Grid2 } from '@mui/material';
import React from 'react'
import Heading from './Heading';
import { Controller } from 'react-hook-form';
export const FormPage1 = ({ control, onNext }) => {
  return (
    <Box>
      <Heading title={"Select a title for your product"} />
      <Box component="form" onSubmit={onNext} width="850px">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Title" fullWidth margin="normal" />
          )}
        />
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const FormPage2 = ({ control, onNext, onBack }) => {
      const categories = [
        "Electronics",
        "Furniture",
        "Home Appliances",
        "Sporting Goods",
        "Outdoor",
        "Toys",
      ];
  return (
    <Box>
      <Heading title={"Select categories"} />
      <Box component="form" onSubmit={onNext} width="850px">
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Categories"
              fullWidth
              margin="normal"
              defaultValue={[]} // Default to an empty array
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
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const FormPage3 = ({ control, onNext, onBack }) => {
  return (
    <Box>
      <Heading title={"Select description"} />
      <Box component="form" onSubmit={onNext}>
        <Controller
          name="description"
          control={control}
          defaultValue="" // Default value for the textarea
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              label="Description"
              style={{padding: '10px', height: '300px', width: '850px', fontSize: '24px'}}
            />
          )}
        />
        <Box mt={4} display='flex' justifyContent='space-between'>
          <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const FormPage4 = ({ control, onNext, onBack }) => {
    return (
      <Box>
        <Heading title={"Select price"} />
        <Box component="form" onSubmit={onNext} width="850px">
          <Grid2 container>
            <Grid2 size={12}>
              <Controller
                name="sellPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Sell Price"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Controller
                name="rentPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rent Price"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={6}>
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
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="" disabled>
                      Select Option
                    </MenuItem>
                    <MenuItem value="hour">Per Hour</MenuItem>
                    <MenuItem value="day">Per Day</MenuItem>
                    <MenuItem value="month">Per Month</MenuItem>
                    <MenuItem value="year">Per Year</MenuItem>
                  </Select>
                )}
              />
            </Grid2>
          </Grid2>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    );
};

export const FormPage5 = ({ data, onSubmit, onBack }) => {    
  return (
    <Box>
      <Heading title={"Summary"} />
      <Box fontSize={24} border='1px solid black' p={3}>
        <Grid2 container>
          <Grid2 size={4}>Title</Grid2>
          <Grid2 size={8}>{data.title}</Grid2>
        </Grid2>
        <Grid2 container mt={2}>
          <Grid2 size={4}>Categories</Grid2>
          <Grid2 size={8}>{data.categories.join(",")}</Grid2>
        </Grid2>
        <Grid2 container mt={2}>
          <Grid2 size={4}>Description</Grid2>
          <Grid2 size={8}>{data.description}</Grid2>
        </Grid2>
        <Grid2 container mt={2}>
          <Grid2 size={4}>Price</Grid2>
          <Grid2 size={8}>${data.sellPrice}</Grid2>
        </Grid2>
        <Grid2 container mt={2}>
          <Grid2 size={4}>Rent</Grid2>
          <Grid2 size={8}>
            ${data.rentPrice} Per {data.rentOption}
          </Grid2>
        </Grid2>
      </Box>
      <Box component="form" onSubmit={onSubmit} width="850px">
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

