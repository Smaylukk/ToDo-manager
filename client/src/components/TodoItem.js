import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoItem = observer((props) => {
  return (
    <Flex
      border="1px"
      borderColor="black"
      borderRadius={10}
      w="100%"
      p={1}
      mb={1}
      justifyContent="space-between"
    >
      <Text>{props.children}</Text>
      <Flex>
        <CheckIcon
          color={["green"]}
          mr="2"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
        />
        <EditIcon
          color={["black"]}
          mr="2"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
        />
        <DeleteIcon
          color="red.500"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
        />
      </Flex>
    </Flex>
  );
});

export default TodoItem;
