import { Divider, Typography } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    CelebrationRounded,
    EmailRounded,
    Person,
    VpnKey,
    Business,
    PhoneIphone,
    ContactMail
} from '@mui/icons-material';
import {
    AuthButton,
    AuthWrapper,
    FormContainer,
    FormControl,
    FormTitle,
    FormWrapper,
    LinkButton,
    Panel,
    PanelImage,
    PanelWrapper,
    SigninForm,
    SignupForm,
    TextReset,
    useStyles
} from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../../redux/slice/user';

//use to detect user login or register
const useAuth = (location) => {
    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
        if (location.pathname === '/login') setIsLogin(true);
        else setIsLogin(false);
    }, [location]);
    return [isLogin];
};

function Auth(props) {
    const location = useLocation();
    const [isLogin] = useAuth(location);
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);

    const [loginForm, setLoginForm] = useState({
        userName: '',
        passWord: ''
    });

    const [registerForm, setRegisterForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '1999-01-01',
        address: '',
        imageCredentialFront: null,
        imageCredentialBack: null
    });


    function handleRegister() {
        let formData = new FormData();
        for (let key in registerForm) {
            formData.append(key, registerForm[key])
        }

        dispatch(register(formData))
            .unwrap()
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
            });
    };

    function handleLogin() {
        // let formData = new FormData();
        const { userName, passWord } = loginForm
        // console.log(formData);
        dispatch(login({ userName, passWord }))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleResetPassword() {
        navigate('/resetpassword')
    }

    useEffect(() => {
        // console.log(user);
        if (user) {
            // console.log(user);
            navigate('/');
        }
        return () => {};
    }, [user, navigate]);


    // const validate = (form) => {
    //     let error = '';
    //     if (!form.name) {
    //         error = 'Please enter display name!!';
    //     } else if (
    //         !form.email ||
    //         !String(form.email)
    //             .toLowerCase()
    //             .match(
    //                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //             )
    //     ) {
    //         error = 'Email does not valid!!!';
    //     } else if (!form.password) {
    //         error = 'Please enter your password!!!';
    //     } else if (form.confirmPassword !== form.password) {
    //         error = 'Password does not match!!';
    //     }
    //     if (error) {
    //         dispatch({
    //             type: SET_SMALL_NOTIFICATION,
    //             payload: {
    //                 data: error
    //             }
    //         });
    //         return false;
    //     }
    //     return true;
    // };
    return (
        <Fragment>
            <AuthWrapper className={isLogin ? '' : 'sign-up-mode'}>
                <FormContainer>
                    <FormWrapper className="signin-signup">
                        <SigninForm /* onSubmit={handleSubmit} */ className="sign-in-form">
                            <FormTitle>Đăng nhập</FormTitle>
                            <FormControl>
                                <EmailRounded />
                                <input
                                    type="text"
                                    /* {loginForm.email} */
                                    onChange={(e) =>
                                        setLoginForm({ ...loginForm, userName: e.target.value })
                                    }
                                    placeholder="Username"
                                />
                            </FormControl>
                            <FormControl>
                                <VpnKey />
                                <input
                                    type="password"
                                    onChange={(e) =>
                                        setLoginForm({ ...loginForm, passWord: e.target.value })
                                    }
                                    placeholder="Password"
                                />
                            </FormControl>
                            <AuthButton
                                onClick={() => {
                                    handleLogin()
                                }}
                                name="login">
                                Đăng nhập
                            </AuthButton>
                            <TextReset onClick={handleResetPassword}>
                                Quên mật khẩu?
                            </TextReset>
                        </SigninForm>
                        <SignupForm className="sign-up-form">
                            <FormTitle>Đăng ký</FormTitle>
                            <FormControl>
                                <Person />
                                <input
                                    type="text"
                                    placeholder="Họ tên"
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, fullName: e.target.value })
                                    }}
                                    required />
                            </FormControl>
                            <FormControl>
                                <EmailRounded />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, email: e.target.value })
                                    }}
                                    required />
                            </FormControl>
                            <FormControl>
                                <PhoneIphone />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, phoneNumber: e.target.value })
                                    }}
                                    required />
                            </FormControl>
                            <FormControl>
                                <CelebrationRounded />
                                <input
                                    type="date"
                                    placeholder="Ngày sinh"
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })
                                    }}
                                    required />
                            </FormControl>
                            <FormControl>
                                <Business />
                                <input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, address: e.target.value })
                                    }}
                                    required />
                            </FormControl>
                            <Divider sx={{ border: "solid 1px black" }} />
                            <Typography sx={{ color: "#ADADAD", fontFamily: "sans-serif", fontSize: "12px" }}>Ảnh mặt trước CMND</Typography>
                            <FormControl>
                                <ContactMail />
                                <input
                                    type="file"
                                    placeholder="CMND mặt trước"
                                    style={{
                                        margin: "auto",
                                        color: "#ADADAD",
                                        fontFamily: "sans-serif",
                                        fontSize: "inherit"
                                    }}
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, imageCredentialFront: e.target.files[0] })
                                    }}
                                    required />

                            </FormControl>
                            <Typography sx={{ color: "#ADADAD", fontFamily: "sans-serif", fontSize: "12px" }}>Ảnh mặt sau CMND</Typography>
                            <FormControl>
                                <ContactMail />
                                <input
                                    type="file"
                                    placeholder="CMND mặt trước"
                                    style={{
                                        margin: "auto",
                                        color: "#ADADAD",
                                        fontFamily: "sans-serif",
                                        fontSize: "inherit"
                                    }}
                                    onChange={(e) => {
                                        setRegisterForm({ ...registerForm, imageCredentialBack: e.target.files[0] })
                                    }}
                                    required />

                            </FormControl>
                            <AuthButton
                                name="register"
                                onClick={() => {
                                    handleRegister()
                                }}
                            >
                                Đăng ký
                            </AuthButton>
                        </SignupForm>
                    </FormWrapper>
                </FormContainer>

                <PanelWrapper>
                    <Panel sx={classes.leftPanel} className="left-panel">
                        <div className="content">
                            <h3>Người dùng mới?</h3>
                            <p>Đăng ký trở thành thành viên để nhận những ưu đãi mơi nhất!</p>
                            <LinkButton to="/register" className="btn transparent">
                                Đăng ký
                            </LinkButton>
                        </div>
                        <PanelImage src="/assets/background/log.svg" className="image" alt="" />
                    </Panel>
                    <Panel sx={classes.rightPanel} className="right-panel">
                        <div className="content">
                            <h3>Đã có tài khoản?</h3>
                            <p>Đăng nhập và sử dụng các tính năng của METAMASK</p>
                            <LinkButton to="/login" className="btn transparent">
                                Đăng nhập
                            </LinkButton>
                        </div>
                        <PanelImage
                            src="/assets/background/register.svg"
                            className="image"
                            alt=""
                        />
                    </Panel>
                </PanelWrapper>
            </AuthWrapper>
        </Fragment>
    );
}

export default Auth;
