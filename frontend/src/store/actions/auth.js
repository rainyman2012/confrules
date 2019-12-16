import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOSTNAME } from "../../static";
import Cookies from "universal-cookie";
import { message } from "antd";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authGetUserDetail = userData => {
  return {
    type: actionTypes.AUTH_GET_USER_DETAIL,
    user: userData
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${HOSTNAME}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const cookies = new Cookies();
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 8 * 1000); // The token will be Expired after 8 hours
        cookies.set("token", token, {
          path: "/",
          expires: expirationDate
        });
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${HOSTNAME}/rest-auth/registration/`, {
        username: username,
        password1: password,
        password2: password
      })
      .then(res => {
        const cookies = new Cookies();
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 8 * 1000); // The token will be Expired after 8 hours

        cookies.set("token", token, {
          path: "/",
          expires: expirationDate
        });
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authProfile = (gender, lang, age, image, key) => {
  return dispatch => {
    axios
      .post(
        `${HOSTNAME}/auth/profile/`,
        {
          age: age,
          gender: gender,
          lang: lang,
          image: image
        },
        {
          headers: {
            Authorization: "Token " + key
          }
        }
      )
      .then(res => {
        const data = res.data;
        console.log(data);
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const getUserDetail = key => {
  return dispatch => {
    dispatch(authStart());
    axios
      .get(`${HOSTNAME}/api/user/`, {
        headers: {
          Authorization: "Token " + key
        }
      })
      .then(res => {
        const userData = res.data;
        dispatch(authGetUserDetail(userData));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
      dispatch(authSuccess(token));
    }
  };
};
