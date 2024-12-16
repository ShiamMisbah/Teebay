import React, { useState } from 'react'
import {Button, TextField, Typography, Box, IconButton, InputAdornment} from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { SIGNUP_USER } from '../queries/userQueries';
import { useMutation } from '@apollo/client';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from '../context/AuthContext';
import Heading from '../components/Heading';

const Signup = () => {
    const navigate = useNavigate()
    const { authUser, setAuthUser } = useAuthContext()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER)
    const { control, register, handleSubmit, getValues, setError, clearErrors, formState: { errors, touchedFields }} = useForm({
          defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          },
        });

    const handleLoginNav = () => {
        navigate('/login')
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (formData) => {
        try {
            await signupUser({
            variables: formData,
            });
        } catch (err) {
        console.error("Unexpected Error:", err.message);
        }
    };

    if (data) {
        localStorage.setItem(
        "user-details-teebay",
        JSON.stringify(data.register)
        );
        console.log(data);
        
        setAuthUser(data.register);
    }

    if (error) {
        alert(error.message);
    }
    
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Heading title={'SIGN UP'} />
            <Box border="1px solid black" width="600px" p={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={6} >
                        <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            error={!!touchedFields.firstName && !!errors.firstName}
                            helperText={touchedFields.firstName && errors.firstName ? errors.firstName.message : null}
                            onBlur={(e) => {
                                field.onBlur();
                                if (!field.value) {
                                    setError("firstName", { type: "manual", message: "firstName is required" });
                                }else {
                                    clearErrors("firstName");
                                }
                            }}
                            />
                        )}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            error={!!touchedFields.lastName && !!errors.lastName}
                            helperText={touchedFields.lastName && errors.lastName ? errors.lastName.message : null}
                            onBlur={(e) => {
                                field.onBlur();
                                if (!field.value) {
                                    setError("lastName", { type: "manual", message: "lastName is required" });
                                }else {
                                    clearErrors("lastName");
                                }
                            }}
                            />
                        )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            label="Address"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            error={!!touchedFields.address && !!errors.address}
                            helperText={touchedFields.address && errors.address ? errors.address.message : null}
                            onBlur={(e) => {
                                field.onBlur();
                                if (!field.value) {
                                    setError("address", { type: "manual", message: "address is required" });
                                }else {
                                    clearErrors("address");
                                }
                            }}
                            />
                        )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={6} >
                        <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            error={!!touchedFields.email && !!errors.email}
                            helperText={touchedFields.email && errors.email ? errors.email.message : null}
                            onBlur={(e) => {
                                field.onBlur();
                                if (!field.value) {
                                    setError("email", { type: "manual", message: "email is required" });
                                }else {
                                    clearErrors("email");
                                }
                            }}
                            />
                        )}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            error={!!touchedFields.phoneNumber && !!errors.phoneNumber}
                            helperText={touchedFields.phoneNumber && errors.phoneNumber ? errors.phoneNumber.message : null}
                            onBlur={(e) => {
                                field.onBlur();
                                if (!field.value) {
                                    setError("phoneNumber", { type: "manual", message: "phoneNumber is required" });
                                }else {
                                    clearErrors("phoneNumber");
                                }
                            }}
                            />
                        )}
                        
                        />
                    </Grid>
                </Grid>
                <Grid container display="flex" flexDirection="column">
                    <Grid>
                        <Controller
                                name='password'
                                control={control}
                                render={({field})=>(
                                    <TextField
                                        {...field}
                                        label="Password"
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={!!touchedFields.password && !!errors.password}
                                        helperText={touchedFields.password && errors.password ? errors.password.message : null}
                                        onBlur={(e) => {
                                            field.onBlur();
                                            if (!field.value) {
                                                setError("password", { type: "manual", message: "Password is required" });
                                            }else {
                                                clearErrors("password");
                                            }
                                        }}
                                    />
                                )}
                            />
                    </Grid>
                    <Grid>
                        <Controller
                                name='confirmPassword'
                                control={control}
                                rules={{
                                    validate: value =>
                                        value === getValues('password') || 'Passwords do not match'
                                }}
                                render={({field})=>(
                                    <TextField
                                        {...field}
                                        label="Password Confirmation"
                                        variant="outlined"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        fullWidth
                                        required
                                        sx={{ mb: 2 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={!!touchedFields.confirmPassword && !!errors.confirmPassword}
                                        helperText={touchedFields.confirmPassword && errors.confirmPassword ? errors.confirmPassword.message : null}
                                        onBlur={(e) => {
                                            field.onBlur();
                                            if (!field.value) {
                                                setError("confirmPassword", { type: "manual", message: "Password Confirmation is required" });
                                            }else {
                                                clearErrors("confirmPassword");
                                            }
                                        }}
                                    />
                                )}
                            />
                    </Grid>
                </Grid>
                <Grid mt={5} container display="flex" flexDirection='column' justifyContent="center" alignItems='center' spacing={3}>
                    <Grid>
                        <Button type='submit' variant="contained">Sign Up</Button>
                    </Grid>
                    <Grid>
                        <Typography variant="body">
                            Already have an account? <Button variant="text" onClick={handleLoginNav}>Login</Button>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
            </Box>
        </Box>
    )
}

export default Signup