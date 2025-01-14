import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {observer} from "mobx-react";
import {RoutesConstants} from "../../shared/RoutesConstants.ts";
import {useCallback, useContext, useEffect} from "react";
import {RegisterPageContext} from "./RegisterPage.store.ts";
import {useNavigate} from "react-router-dom";
import {useRegisterValidation} from "./hooks/UseRegisterValidation.ts";

const defaultTheme = createTheme();

export const RegisterPage = observer(() => {
    const {
        registerData,
        errorData,
        setUsernameValue,
        setUserTypeValue,
        setEmailValue,
        setPasswordValue,
        setUsernameIsTouched,
        setEmailIsTouched,
        setPasswordIsTouched,
        createUser,
        reset
    } = useContext(RegisterPageContext);

    const navigate = useNavigate();

    const registerUser = useCallback(async () => {
        console.log("registerUser")
        const isUserCreated = await createUser();
        if (isUserCreated) {
            navigate(RoutesConstants.LoginRoute);
        }
    }, [createUser, navigate]);

    const sendRegisterData = useRegisterValidation(registerUser, registerData);

    useEffect(() => reset, [reset]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendRegisterData();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    onChange={setUsernameValue}
                                    onFocus={setUsernameIsTouched}
                                    error={errorData.usernameError.isTouched && !!errorData.usernameError.message}
                                    helperText={errorData.usernameError.isTouched ? errorData.usernameError.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-type"
                                    name="userType"
                                    required
                                    fullWidth
                                    id="userType"
                                    label="UserType"
                                    autoFocus
                                    onChange={setUserTypeValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={setEmailValue}
                                    onFocus={setEmailIsTouched}
                                    error={errorData.emailError.isTouched && !!errorData.emailError.message}
                                    helperText={errorData.emailError.isTouched ? errorData.emailError.message : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={setPasswordValue}
                                    onFocus={setPasswordIsTouched}
                                    error={errorData.passwordError.isTouched && !!errorData.passwordError.message}
                                    helperText={errorData.passwordError.isTouched ? errorData.passwordError.message : ""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link onClick={() => navigate(RoutesConstants.LoginRoute)} href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
});