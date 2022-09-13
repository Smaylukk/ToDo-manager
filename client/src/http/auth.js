import jwt_decode from "jwt-decode";

export const processToken = (token) => {
  localStorage.setItem("token", token);
  return jwt_decode(token);
};
