import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://localhost:44311/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
// .post(API_URL + "api/TokenAuth/Authenticate", {
// .post(API_URL + "signin", {

const login = async (username, password) => {
  debugger;
  const response = await axios.post(API_URL + "api/TokenAuth/Authenticate", {
    userNameOrEmailAddress: username,
    password,
  });
  debugger;
  if (response.data.result.accessToken) {
    localStorage.setItem("user", response.data.result);
  }
  return response.data.result;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
