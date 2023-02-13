import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BAKCEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;
// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
// REGISTER USER

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

//LOGIN USER
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

//LOGOUT USER
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};
//GET LOGIN STATUS
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};
//GET USER PROFILE
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};
//UPDATE PROFILE
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};
// SEND VERIFICATION EMAIL
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};
// VERIFY USER
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`,
    verificationToken
  );
  return response.data.message;
};
// CHANGE PASSWORD
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data.message;
};
const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
};

export default authService;
