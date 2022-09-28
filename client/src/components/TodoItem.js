import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoItem = observer((props) => {
  const { item, listId, children, itemToggle, itemEdit, itemDelete } = props;

  return (
    <>
      <Flex
        border="1px"
        borderColor="black"
        borderRadius={10}
        w="100%"
        p={1}
        //mb={1}
        justifyContent="space-between"
        _hover={{ bgColor: "gray.100" }}
      >
        <Text
          decoration={item.isDone ? "line-through" : "none"}
          color={item.isDone ? "green" : "black"}
        >
          {children}
        </Text>
        <Flex>
          <CheckIcon
            color={["green"]}
            mr="3"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              itemToggle(item.id);
            }}
          />
          <EditIcon
            color={["black"]}
            mr="3"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              itemEdit(item.id, listId);
            }}
          />
          <DeleteIcon
            color="red.500"
            cursor={"pointer"}
            _hover={{ transform: "scale(1.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              itemDelete(item.id);
            }}
          />
        </Flex>
      </Flex>
    </>
  );
});

export default TodoItem;
