'use client';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface FormInputs {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function FormSignup() {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    // Hàm đăng ký tài khoản
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            push('/login');
        } catch (error) {
            alert("Can't sign up. Please try again");
        }
    };

    return (
        <Box className="mx-3 w-96 py-6 px-7 min-h-80 bg-transparent backdrop-blur-lg shadow shadow-white rounded-2xl">
            <h3 className="text-3xl font-bold text-center text-white mb-2">
                Sign Up
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <FormControl
                        variant="standard"
                        error={!!errors.email}
                        fullWidth
                    >
                        <InputLabel style={{ fontSize: 20 }} htmlFor="email">
                            Email
                        </InputLabel>
                        <Input
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            style={{ marginBottom: 5 }}
                            startAdornment={
                                <InputAdornment
                                    className="*:text-white"
                                    position="start"
                                >
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </FormControl>
                </div>
                <div className="mb-4">
                    <FormControl
                        variant="standard"
                        error={!!errors.password}
                        fullWidth
                    >
                        <InputLabel style={{ fontSize: 20 }} htmlFor="password">
                            Password
                        </InputLabel>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            style={{ marginBottom: 5 }}
                            startAdornment={
                                <InputAdornment
                                    className="*:text-white"
                                    position="start"
                                >
                                    <PasswordIcon />
                                </InputAdornment>
                            }
                        />
                        <p className="text-xs text-slate-300">
                            Using password email
                        </p>
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </FormControl>
                </div>
                <div className="mb-4">
                    <FormControl
                        variant="standard"
                        error={!!errors.confirmPassword}
                        fullWidth
                    >
                        <InputLabel
                            style={{ fontSize: 20 }}
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </InputLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                            })}
                            style={{ marginBottom: 5 }}
                            startAdornment={
                                <InputAdornment
                                    className="*:text-white"
                                    position="start"
                                >
                                    <PasswordIcon />
                                </InputAdornment>
                            }
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </FormControl>
                </div>

                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 3 }}
                >
                    SIGN UP
                </Button>
            </form>
            <p className="text-end text-xs mt-3 text-white">
                Do have an account?
                <button className="ms-1" onClick={() => push('/login')}>
                    Login
                </button>
            </p>
        </Box>
    );
}
