import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  VpnKey,
} from "@mui/icons-material";
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
  useStyles,
} from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { firstLogin as firstlogin } from "../../redux/slice/user";

//use to detect user login or register

function FirstLogin(props) {
  const location = useLocation();
  // const [isLogin] = useAuth(location);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [loginForm, setLoginForm] = useState({
    username: user ? user.data.username : "",
    passWord: "",
    repassWord: "",
  });

  function handleLogin() {
    // let formData = new FormData();
    const { username, passWord, repassWord } = loginForm;
    // console.log(formData);
    if (username !== "") {
      dispatch(firstlogin({ username, passWord, repassWord }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <Fragment>
      <AuthWrapper /*className={isLogin ? '' : 'sign-up-mode'}*/>
        <FormContainer>
          <FormWrapper className="signin-signup">
            <SigninForm /* onSubmit={handleSubmit} */ className="sign-in-form">
              <FormTitle>Đăng nhập lần đầu</FormTitle>
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
                  handleLogin();
                }}
                name="login"
              >
                Đăng nhập
              </AuthButton>
            </SigninForm>
          </FormWrapper>
        </FormContainer>

        <PanelWrapper>
          <Panel sx={classes.leftPanel} className="left-panel">
            <div className="content">
              <h3>Chào mừng bạn đến với FoxWallet</h3>
              <p>Bạn cần phải thay đổi lại mật khẩu để đăng nhập vào ví</p>
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
          <Panel sx={classes.rightPanel} className="right-panel">
            <div className="content">
              <h3>Đã có tài khoản?</h3>
              <p>Đăng nhập và sử dụng các tính năng của MoviePro</p>
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

export default FirstLogin;
