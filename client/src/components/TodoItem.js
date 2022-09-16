import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoItem = observer((props) => {
  const { item } = props;

  return (
    <>
      <Flex
        border="1px"
        borderColor="black"
        borderRadius={10}
        w="100%"
        p={1}
        mb={1}
        justifyContent="space-between"
      >
        <Text decoration={item.isDone ? "line-through" : "none"}>
          {props.children}
        </Text>
        <Flex>
          <CheckIcon
            color={["green"]}
            mr="3"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              props.itemToogle(item.id);
            }}
          />
          <EditIcon
            color={["black"]}
            mr="3"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              props.itemEdit(item.id);
            }}
          />
          <DeleteIcon
            color="red.500"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              props.itemDelete(item.id);
            }}
          />
        </Flex>
      </Flex>
    </>
  );
});

export default TodoItem;
