import React from 'react'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries/userQueries';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    const { authUser, setAuthUser } = useAuthContext()
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER)
    const { control, register, handleSubmit, formState: { errors, touchedFields },} = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const handleSignupNav = () => {
      navigate("/signup");
    };

    const onSubmit = async (formData) => {
        try {
            await loginUser({
                variables: { email: formData.email, password: formData.password },
            });   
        } catch (err) {
            console.error("Unexpected Error:", err.message);
        }
    };

    if (data) {
      localStorage.setItem("user-details-teebay", JSON.stringify(data.login));
      setAuthUser(data.login);
    }

    if (error) {
        alert(error.message) 
    }

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" gutterBottom mb={2}>
          SIGN IN
        </Typography>
        <Box border="1px solid black" width="300px" height="350px" p={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} display="flex" flexDirection="column">
              <Grid>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="email"
                      variant="outlined"
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="password"
                      variant="outlined"
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid mt={5} container display="flex" flexDirection='column' justifyContent="center" alignItems='center' spacing={3}>
              <Grid>
                <Button type='submit' variant="contained">Log In</Button>
              </Grid>
              <Grid>
                <Typography variant="body">
                  Dont have an account? <Button variant="text" onClick={handleSignupNav}>Signup</Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    );
}

export default Login