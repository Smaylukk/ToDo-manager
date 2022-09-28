import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../routes/path";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { observer } from "mobx-react-lite";
import useLogin from "../hooks/useLogin";

const Auth = observer(() => {
  const location = useLocation();
  const isLoginPage = location.pathname === LOGIN_ROUTE;
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showError = (text) => {
    setIsError(true);
    setTextError(text);
  };
  const hideError = () => {
    setIsError(false);
    setTextError("");
  };

  const authHandler = useLogin(isLoginPage, showError, username, password);

  const handleShowClick = () => setShowPassword(!showPassword);

  const buttonClick = async (e) => {
    e.preventDefault();
    hideError();
    await authHandler();
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
        <Alert status="error" display={isError ? "flex" : "none"}>
          <AlertIcon />
          {textError}
        </Alert>
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
