import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { Context } from "..";
import { LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE } from "../routes/path";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTRATION } from "../http/userAPI";
import { processToken } from "../http/auth";
import { observer } from "mobx-react-lite";
import client from "../graphql/client";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === LOGIN_ROUTE;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginApi] = useMutation(LOGIN);
  const [registerApi] = useMutation(REGISTRATION);

  const handleShowClick = () => setShowPassword(!showPassword);

  const buttonClick = async (e) => {
    e.preventDefault();
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
            console.log(decodedData);
            console.log(localStorage.getItem("token"));

            await client.clearStore();
            client
              .resetStore()
              .then(() => navigate(HOME_ROUTE))
              .catch(() => {});
          }
        })
        .catch((err) => {
          console.error(err.message);
          user.setUser(null);
          user.setIsAuth(false);
        });
    } else {
      registerApi({
        variables: {
          username,
          password,
        },
      })
        .then(async (data) => {
          const token = data?.public?.register?.token;
          if (token) {
            const decodedData = processToken(token);
            user.setUser(decodedData);
            user.setIsAuth(true);
          }
        })
        .catch(() => {
          user.setUser(null);
          user.setIsAuth(false);
        })
        .finally(async () => {
          await client.resetStore();
          navigate(HOME_ROUTE);
        });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <h2>{isLoginPage ? "Авторизація" : "Реєстрація"}</h2>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Вітаємо</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={buttonClick}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Ім'я користувача"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                {isLoginPage ? "Авторизація" : "Реєстрація"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Немає аккаунту?{" "}
        <NavLink to={isLoginPage ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
          {isLoginPage ? "Зареєструтесь" : "Авторизуйтесь"}
        </NavLink>
      </Box>
    </Flex>
  );
});

export default Auth;
