import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Flex } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoItemHeading = observer((props) => {
  return (
    <Flex justifyContent={"space-between"} w={"100%"}>
      <Box flex="1" textAlign="left" color={props.list.color}>
        {props.list.name}
      </Box>
      <AddIcon
        color={["green"]}
        mr="2"
        cursor={"pointer"}
        _hover={{ transform: "scale(1.5)" }}
        onClick={(e) => {
          e.stopPropagation();
          props.itemCreate(props.list.id);
        }}
      />
      <EditIcon
        color={["black"]}
        mr="2"
        cursor={"pointer"}
        _hover={{ transform: "scale(1.5)" }}
        onClick={(e) => {
          e.stopPropagation();
          props.listEdit(props.list.id);
        }}
      />
      <DeleteIcon
        color="red.500"
        cursor={"pointer"}
        _hover={{ transform: "scale(1.5)" }}
        onClick={(e) => {
          e.stopPropagation();
          props.listDelete(props.list.id);
        }}
      />
    </Flex>
  );
});

export default TodoItemHeading;
