import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, LinearProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Credentials } from '../interfaces/interfaces';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';

const SignIn: React.FC = () => {
    const { error, loading, signInUser } = useSignIn();
    const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
    const [errors, setErrors] = useState<Credentials>({ email: '', password: '' });
    const [submitted, setSubmitted] = useState(false);

    // const [signIn, setSignIn] = useState<SignInFields>(blankSignInFields());
    // //const [errors, setErrors] = useState<SignInFields>(blankSignInFields());

    // const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);


        if (!validateFields()) {
            return;
        }

        const result = await signInUser(credentials);

        if (result === 200) {
            navigate(`/`);
        }

        // setIsLoading(true);

        // signIn.UserTable = "Users";
        // signIn.UserNameField = "Email";
        // signIn.PasswordField = "Pin";

        // const response = await fetch('https://7udlon6f8l.execute-api.us-east-1.amazonaws.com/dev/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(signIn)
        // });

        // if (response.status !== 200) {
        //     errors.Password = 'Email or password is incorrect';
        //     setErrors(errors);

        // } else {
        //     const data = await response.json();
        //     localStorage.setItem('bus_app_token', data.token);
        //     navigate(`/`);
        // }

        // setIsLoading(false);
    };

    useEffect(() => {
        validateFields();
    }, [credentials]);

    const validateFields = () => {
        let isValid = true;
        let errors = { email: '', password: '' };

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(credentials.email)) {
            isValid = false;
            errors.email = 'Please enter a valid email address (e.g. name@gmail.com)';
        }

        if (credentials.email.length <= 0) {
            isValid = false;
            errors.email = 'This entry is required';
        }

        if (credentials.password.length <= 0) {
            isValid = false;
            errors.password = 'This entry is required';
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setCredentials({
            ...credentials,
            [event.target.name as string]: event.target.value
        });
    };

    return (
        <Stack>
            {loading && <LinearProgress />}
            <Container maxWidth="xs">
                {/* <CssBaseline /> */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            onChange={handleInputChange}
                            autoFocus
                            value={credentials.email}
                            error={submitted && !!errors.email}
                            helperText={submitted && errors.email}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handleInputChange}
                            value={credentials.password}
                            error={submitted && (!!errors.password || !!error)}
                            helperText={submitted && (errors.password || error)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Stack>
    );
}

export default SignIn;
