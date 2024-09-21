'use client';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PasswordIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';

interface FormInputs {
    email: string;
    password: string;
}

export default function FormLogin() {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    // Hàm đăng nhập bằng email và password
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            alert('Login failed!');
        }
    };

    // Hàm đăng nhập bằng Google
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            alert('Login failed!');
        }
    };

    // Hàm đăng nhập bằng Facebook
    const loginWithFacebook = async () => {
        try {
            await signInWithPopup(auth, new FacebookAuthProvider());
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <Box className="mx-3 w-96 py-6 px-7 min-h-80 bg-transparent backdrop-blur-lg shadow shadow-white rounded-2xl">
            <h3 className="text-3xl font-bold text-center text-white mb-2">
                Log in with
            </h3>
            <div className="w-full flex justify-around my-3">
                <Button
                    onClick={loginWithGoogle}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                >
                    Google
                </Button>
                <div className="w-5" />
                <Button
                    fullWidth
                    onClick={loginWithFacebook}
                    startIcon={<FacebookIcon />}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                >
                    Facebook
                </Button>
            </div>
            <div className="flex items-center mb-3">
                <hr className="flex-1 opacity-50" />
                <p className="mx-1 mb-1 text-white">or</p>
                <hr className="flex-1 opacity-50" />
            </div>
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

                <div className="mb-5">
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
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
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
                    LOGIN
                </Button>
            </form>
            <p className="text-end text-xs mt-3 text-white">
                Do not have an account?
                <button className="ms-1" onClick={() => push('/signup')}>
                    Register
                </button>
            </p>
        </Box>
    );
}
