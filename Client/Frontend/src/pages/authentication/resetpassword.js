import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VpnKey } from "@mui/icons-material";
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
  useStyles,
  TextReset,
} from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { otp, resetPassword, validateOTP } from "../../redux/slice/user";

export function ResetPassWord() {
  const location = useLocation();
  // const [isLogin] = useAuth(location);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  //   const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');

  function handleResetPassword() {
    dispatch(otp({ email: email, username: '' })).then(() => {
      localStorage.setItem("email", email);
      navigate("/resetpasswordconfirm");
    })
  }

  return (
    <Fragment>
      <AuthWrapper /*className={isLogin ? '' : 'sign-up-mode'}*/>
        <FormContainer>
          <FormWrapper className="signin-signup">
            <SigninForm /* onSubmit={handleSubmit} */ className="sign-in-form">
              <FormTitle>Khôi phục mật khẩu</FormTitle>
              <FormControl>
                <VpnKey />
                <input
                  type="email"
                  /* {loginForm.email} */
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Nhập email của bạn"
                  required
                />
              </FormControl>
              <AuthButton
                onClick={() => {
                  handleResetPassword();
                }}
                name="confirm"
              >
                Xác nhận
              </AuthButton>
            </SigninForm>
            {/* <TextReset onClick={handleLogin()}>
                Có tài khoản? Đăng nhập
              </TextReset> */}
          </FormWrapper>
        </FormContainer>

        <PanelWrapper>
          <Panel sx={classes.leftPanel} className="left-panel">
            <div className="content">
              <h3>Chào mừng bạn đến với METAMASK</h3>
              <p>Bạn có thể khôi phục mật khẩu của mình</p>
              {/* <LinkButton to="/register" className="btn transparent">
                                Đăng ký
                            </LinkButton> */}
            </div>
            <PanelImage
              src="/assets/background/log.svg"
              className="image"
              alt=""
            />
          </Panel>
        </PanelWrapper>
      </AuthWrapper>
    </Fragment>
  );
}

export function ResetPassWordConfirm(props) {
  const location = useLocation();
  // const [isLogin] = useAuth(location);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');

  function handleResetConfirm() {
    dispatch(validateOTP({ otp }))
      .then(() => {
        navigate("/repassword");
      })
  }

  return (
    <Fragment>
      <AuthWrapper>
        <FormContainer>
          <FormWrapper className="signin-signup">
            <SigninForm /* onSubmit={handleSubmit} */ className="sign-in-form">
              <FormTitle>Nhập OTP để xác thực</FormTitle>
              <FormControl>
                <VpnKey />
                <input
                  type="text"
                  onChange={(e) =>
                    setOTP(e.target.value)
                  }
                  placeholder="Nhập mã OTP được gửi đến email"
                />
              </FormControl>

              <AuthButton
                onClick={() => {
                  handleResetConfirm();
                }}
                name="resetconfirm"
              >
                Xác nhận
              </AuthButton>
            </SigninForm>
          </FormWrapper>
        </FormContainer>

        <PanelWrapper>
          <Panel sx={classes.leftPanel} className="left-panel">
            <div className="content">
              <h3>Chào mừng bạn đến với METAMASK</h3>
              <p>Bạn có thể khôi phục mật khẩu của mình</p>
              {/* <LinkButton to="/register" className="btn transparent">
                                Đăng ký
                            </LinkButton> */}
            </div>
            <PanelImage
              src="/assets/background/log.svg"
              className="image"
              alt=""
            />
          </Panel>
        </PanelWrapper>
      </AuthWrapper>
    </Fragment>
  );
}

export function RePassWord(props) {
  const location = useLocation();
  // const [isLogin] = useAuth(location);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    passWord: "",
    repassWord: "",
  });

  let email = localStorage.getItem("email") ? localStorage.getItem("email") : "";

  function handleConfirm() {
    if (loginForm.passWord === loginForm.repassWord) {
      dispatch(resetPassword({ email, password: loginForm.passWord }))
        .then(() => {
          navigate("/login");
        })
    }
  }

  return (
    <Fragment>
      <AuthWrapper>
        <FormContainer>
          <FormWrapper className="signin-signup">
            <SigninForm /* onSubmit={handleSubmit} */ className="sign-in-form">
              <FormTitle>Khôi phục mật khẩu</FormTitle>
              <FormControl>
                <VpnKey />
                <input
                  type="password"
                  /* {loginForm.email} */
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, passWord: e.target.value })
                  }
                  placeholder="Mật khẩu mới"
                />
              </FormControl>
              <FormControl>
                <VpnKey />
                <input
                  type="password"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, repassWord: e.target.value })
                  }
                  placeholder="Nhập lại mật khẩu"
                />
              </FormControl>
              <AuthButton
                onClick={() => {
                  handleConfirm();
                }}
                name="login"
              >
                Xác nhận
              </AuthButton>
            </SigninForm>
          </FormWrapper>
        </FormContainer>

        <PanelWrapper>
          <Panel sx={classes.leftPanel} className="left-panel">
            <div className="content">
              <h3>Chào mừng bạn đến với METAMASK</h3>
              <p>Bạn có thể khôi phục mật khẩu của mình</p>
            </div>
            <PanelImage
              src="/assets/background/log.svg"
              className="image"
              alt=""
            />
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
