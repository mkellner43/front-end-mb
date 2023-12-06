import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { login, guestLogin } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUsername,
  updatePassword,
  setUsernameError,
  setPasswordError,
  setMainError,
  setCurrentUser,
  setToken,
  setAlert,
} from "./features/loginSlice";
import { setNotification } from "../Signup/features/signUpSlice";
import React from "react";

interface State {
  login: {
    username: string;
    password: string;
    usernameError: string;
    passwordError: string;
    mainError: string;
    alert: string;
  };
  signup: {
    notification: string;
  };
}

interface submitCredentials {
  username: string;
  password: string;
}

interface guestCredentials {
  isGuest: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const username = useSelector((state: State) => state.login.username);
  const password = useSelector((state: State) => state.login.password);
  const usernameError = useSelector(
    (state: State) => state.login.usernameError
  );
  const passwordError = useSelector(
    (state: State) => state.login.passwordError
  );
  const mainError = useSelector((state: State) => state.login.mainError);
  const userCreated = useSelector((state: State) => state.signup.notification);
  const sleepAlert = useSelector((state: State) => state.login.alert);
  const dispatch = useDispatch();

  const submitLogin = useMutation({
    mutationFn: (credentials: submitCredentials) => login(credentials),
    onSuccess: (data) => {
      dispatch(setCurrentUser(data));
      dispatch(setToken(data.token));
      dispatch(updateUsername(""));
      dispatch(updatePassword(""));
      dispatch(setNotification(null));
      dispatch(setUsernameError(null));
      dispatch(setPasswordError(null));
      dispatch(setMainError(null));
      dispatch(setAlert(null));
    },
    retry: false,
    onMutate: (variables) => {
      const timeoutDuration = 3000;
      const timeout = setTimeout(() => {
        dispatch(
          setAlert(
            "This server is running on a free instance in the cloud that spins down if unused. It may take a few seconds for the first login. Thank you for your patience!"
          )
        );
        login(variables);
      }, timeoutDuration);

      return { timeout };
    },
    onSettled: (_data, _error, _variables, context: any) => {
      clearTimeout(context.timeout);
      navigate("/");
    },
    onError: (err, _variables, context) => {
      clearTimeout(context.timeout);
      dispatch(setAlert(null));
      dispatch(setMainError(err));
    },
  });

  const submitGuestLogin = useMutation({
    mutationFn: (credentials: guestCredentials) => guestLogin(credentials),
    onSuccess: (data) => {
      dispatch(setCurrentUser(data));
      dispatch(setToken(data.token));
      dispatch(updateUsername(""));
      dispatch(updatePassword(""));
      dispatch(setNotification(null));
      dispatch(setUsernameError(null));
      dispatch(setPasswordError(null));
      dispatch(setMainError(null));
    },
    retry: false,
    onMutate: (variables) => {
      const timeoutDuration = 3000;
      const timeout = setTimeout(() => {
        dispatch(
          setAlert(
            "This server is running on a free instance in the cloud that spins down if unused. It may take a few seconds for the first login. Thank you for your patience!"
          )
        );
        login(variables);
      }, timeoutDuration);

      return { timeout };
    },
    onSettled: (_data, _error, _variables, context: any) => {
      clearTimeout(context.timeout);
      navigate("/");
    },
    onError: (err, _variables, context) => {
      clearTimeout(context.timeout);
      dispatch(setMainError(err));
    },
  });

  const handleClose = () => {
    dispatch(setMainError(null));
    dispatch(setNotification(null));
  };

  const removeAlert = () => {
    dispatch(setAlert(null));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.cookie = "access_token= ; max-age=0";
    !username
      ? dispatch(setUsernameError("Username is required"))
      : dispatch(setUsernameError(null));
    !password
      ? dispatch(setPasswordError("Password is required"))
      : dispatch(setPasswordError(null));
    if (username && password) {
      const credentials = {
        username: username,
        password: password,
      };
      submitLogin.mutate(credentials);
    }
  };

  const handleGuestLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.cookie = "access_token= ; max-age=0";
    const credentials = {
      isGuest: true,
    };
    submitGuestLogin.mutate(credentials);
  };
  return (
    <form className="center">
      <div className="page-width-form center">
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          sx={{ m: 4 }}
        >
          Log In
        </Typography>
        {mainError && (
          <Snackbar
            open={mainError ? true : false}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={handleClose}>
              {mainError}
            </Alert>
          </Snackbar>
        )}
        {userCreated && (
          <Snackbar
            open={userCreated ? true : false}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={handleClose}>
              {userCreated}
            </Alert>
          </Snackbar>
        )}
        <TextField
          error={usernameError !== null}
          helperText={usernameError}
          fullWidth
          value={username}
          name="username"
          onChange={(e) => dispatch(updateUsername(e.target.value))}
          size="small"
          label="Username"
          type="text"
          sx={{ m: 1 }}
        />
        <TextField
          error={passwordError !== null}
          helperText={passwordError}
          fullWidth
          value={password}
          name="password"
          onChange={(e) => dispatch(updatePassword(e.target.value))}
          size="small"
          label="Password"
          type="password"
          autoComplete="new-password"
          sx={{ m: 1 }}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{ m: 1 }}
          disabled={submitLogin.isLoading}
        >
          Sign In
        </Button>
        {submitLogin.isLoading && (
          <div className="absolute flex center">
            <CircularProgress color="primary" />
          </div>
        )}
      </div>
      <div>
        <Typography variant="body1" sx={{ m: 1, textAlign: "center" }}>
          Don't have an account yet?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => navigate("/signup")}
          disabled={submitLogin.isLoading}
          sx={{ m: 1 }}
        >
          Sign up
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleGuestLogin}
          sx={{ m: 1 }}
          disabled={submitLogin.isLoading}
        >
          Sign in as Guest
        </Button>
      </div>
      <Snackbar
        open={
          (submitLogin.isLoading && sleepAlert) ||
          (submitGuestLogin.isLoading && sleepAlert)
            ? true
            : false
        }
        onClose={removeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={removeAlert}>
          {sleepAlert}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;
