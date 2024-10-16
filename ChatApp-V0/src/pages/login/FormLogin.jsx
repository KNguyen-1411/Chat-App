import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import styles from './login.module.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { useDate } from '../../hooks/useDate';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
export default function FormLogin() {
    const { date, time } = useDate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const handleLogin = async (type) => {
        const provider = type === 'facebook' ? fbProvider : googleProvider;
        setLoading(true);
        setError(null);
        try {
            const { user } = await signInWithPopup(auth, provider);
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: date + ' ' + time
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {};

    return (
        <>
            <Card className={styles.card}>
                <Card.Header className="text-center fs-3 fw-bold">
                    Log in with
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-2">
                            <Col>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="w-100"
                                    onClick={() => handleLogin('facebook')}
                                >
                                    <i className="bi bi-facebook me-2"></i>
                                    FaceBook
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="w-100"
                                    onClick={() => handleLogin('google')}
                                >
                                    <i className="bi bi-google me-2"></i>
                                    Google
                                </Button>
                            </Col>
                        </Row>
                        <div className={styles.searator}>
                            <hr />
                            <span>or</span>
                            <hr />
                        </div>
                        <Row className="mb-4 px-3">
                            <FormControl
                                variant="standard"
                                error={!!errors.account}
                            >
                                <InputLabel htmlFor="account">
                                    Account
                                </InputLabel>
                                <Input
                                    id="account"
                                    type="text"
                                    {...register('account', {
                                        required: 'Account is required'
                                    })}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <i className="bi bi-person-circle"></i>
                                        </InputAdornment>
                                    }
                                />
                                {errors.account && (
                                    <span className="text-danger">
                                        {errors.account.message}
                                    </span>
                                )}
                            </FormControl>
                        </Row>
                        <Row className="mb-4 px-3">
                            <FormControl
                                variant="standard"
                                error={!!errors.password}
                            >
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required'
                                    })}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <i className="bi bi-shield-lock-fill"></i>
                                        </InputAdornment>
                                    }
                                />
                                {errors.password && (
                                    <span className="text-danger">
                                        {errors.password.message}
                                    </span>
                                )}
                            </FormControl>
                        </Row>
                        <Button
                            onClick={() => {
                                if (errors.account || errors.password) return;
                                else handleClickOpen();
                            }}
                            variant="contained"
                            size="large"
                            className="w-100"
                            type="submit"
                        >
                            Login
                        </Button>
                        <div className={styles.register}>
                            <p>
                                Don’t have an account?{' '}
                                <button
                                    onClick={handleClickOpen}
                                    className={styles.btnNone}
                                >
                                    Register
                                </button>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Feature is currently under development
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can use login with Facebook or Google
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
