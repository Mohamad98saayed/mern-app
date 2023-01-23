import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: false,
    errorMessage: "",
    isAuthenticated: false,
    currentUser: {},
    data: {},
  },

  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    setIsAuthenticated: (state) => {
      state.isAuthenticated = false;
    },

    register: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.data = action.payload;
    },

    getCurrent: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },

    logout: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.errorMessage = "";
      state.isAuthenticated = false;
      state.currentUser = {};
      state.data = action.payload;
    },

    updateAvatar: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.data = action.payload;
    },

    updateDetails: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.data = action.payload;
    },

    updatePassword: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.data = action.payload;
    },

    forgotPassword: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.data = action.payload;
    },

    resetPassword: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.data = action.payload;
    },

    deactivateAccount: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = false;
      state.errorMessage = "";
      state.currentUser = {};
      state.data = action.payload;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

//USER: register user
export const registerAsync = (userData) => (dispatchEvent) => {
  dispatchEvent(setLoading());
  dispatchEvent(setIsAuthenticated());

  //config
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("/api/v1/auth/register", userData, config)
    .then(({ data }) => dispatchEvent(register(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: login user
export const loginAsync = (userData) => (dispatchEvent) => {
  dispatchEvent(setLoading());
  dispatchEvent(setIsAuthenticated());

  //config
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("/api/v1/auth/login", userData, config)
    .then(({ data }) => dispatchEvent(register(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: logout user
export const logoutAsync = () => (dispatchEvent) => {
  dispatchEvent(setLoading());

  axios
    .get("/api/v1/auth/logout")
    .then(({ data }) => dispatchEvent(logout(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: get current user
export const getCurrentAsync = () => (dispatchEvent) => {
  dispatchEvent(setLoading());

  axios
    .get("/api/v1/auth/profile")
    .then(({ data }) => dispatchEvent(getCurrent(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: update user profile picture
export const updateAvatarAsync = (avatar) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .patch("/api/v1/auth/profile/avatar", avatar, config)
    .then(({ data }) => dispatchEvent(updateAvatar(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: update user profile details
export const updateDetailsAsync = (userData) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .put("/api/v1/auth/profile/update", userData, config)
    .then(({ data }) => dispatchEvent(updateDetails(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: update user password
export const updatePasswordAsync = (userData) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .patch("/api/v1/auth/password/update", userData, config)
    .then(({ data }) => dispatchEvent(updatePassword(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: update user password
export const forgotPasswordAsync = (email) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("/api/v1/auth/password/forgot", email, config)
    .then(({ data }) => dispatchEvent(forgotPassword(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: reset user password
export const resetPasswordAsync = (userData, token) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .put(`/api/v1/auth/password/reset/${token}`, userData, config)
    .then(({ data }) => dispatchEvent(resetPassword(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

//USER: deactivate user
export const deactivateAccountAsync = (userData, token) => (dispatchEvent) => {
  dispatchEvent(setLoading());

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .put("/api/v1/auth/active", userData, config)
    .then(({ data }) => dispatchEvent(deactivateAccount(data)))
    .catch((err) => dispatchEvent(setError(err.response.data.message)));
};

export const {
  setLoading,
  setIsAuthenticated,
  register,
  getCurrent,
  logout,
  updateAvatar,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  deactivateAccount,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
