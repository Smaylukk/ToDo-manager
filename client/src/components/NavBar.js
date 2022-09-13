import React, { useContext, useState } from "react";
import { Context } from "..";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import client from "../graphql/client";
import { observer } from "mobx-react-lite";

const NavBar = observer((props) => {
  const { user } = useContext(Context);

  const logout = async () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    await client.resetStore();
  };

  return (
    <NavBarContainer {...props}>
      <Logo user={user.user.username} color={["white"]} />
      <MenuLinks logout={logout} />
    </NavBarContainer>
  );
});

const Logo = (props) => (
  <Center {...props}>
    <Text fontSize="lg" fontWeight="bold">
      ToDo list application - {props.user}
    </Text>
  </Center>
);

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ logout }) => {
  return (
    <Box flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem isLast>
          <Button
            size="sm"
            rounded="md"
            color={["white"]}
            bg={["teal"]}
            _hover={{
              bg: ["black"],
            }}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={1}
      p={1}
      bg={["teal"]}
      color={["white"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
