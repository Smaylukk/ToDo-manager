import { useContext } from "react";
import { Context } from "../index";
import { processToken } from "../http/auth";
import { HOME_ROUTE } from "../routes/path";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTRATION } from "../http/userAPI";
import { useNavigate } from "react-router-dom";

export default function useLogin(isLoginPage, showError, username, password) {
  const { user } = useContext(Context);
  const [loginApi] = useMutation(LOGIN);
  const [registerApi] = useMutation(REGISTRATION);
  const navigate = useNavigate();

  return async () => {
    if (isLoginPage) {
      loginApi({
        variables: {
          username,
          password,
        },
      })
        .then(async ({ data }) => {
          const token = data?.public?.login?.token;
          if (token) {
            const decodedData = processToken(token);
            user.setUser(decodedData);
            user.setIsAuth(true);

            navigate(HOME_ROUTE);
          }
        })
        .catch((err) => {
          //console.error(err);
          user.setUser(null);
          user.setIsAuth(false);

          showError(err.message);
        });
    } else {
      registerApi({
        variables: {
          username,
          password,
        },
      })
        .then(async ({ data }) => {
          console.log(data);
          const token = data?.public?.register?.token;
          if (token) {
            const decodedData = processToken(token);
            user.setUser(decodedData);
            user.setIsAuth(true);

            navigate(HOME_ROUTE);
          }
        })
        .catch((err) => {
          user.setUser(null);
          user.setIsAuth(false);

          showError(err.message);
        });
    }
  };
}
