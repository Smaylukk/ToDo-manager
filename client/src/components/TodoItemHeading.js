import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Flex } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoItemHeading = observer(
  ({ itemCreate, list, listDelete, listEdit }) => {
    return (
      <Flex justifyContent={"space-between"} w={"100%"}>
        <Box flex="1" textAlign="left" color={list.color}>
          {list.name}
        </Box>
        <AddIcon
          color={["green"]}
          mr="2"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
          onClick={(e) => {
            e.stopPropagation();
            itemCreate(list.id);
          }}
        />
        <EditIcon
          color={["black"]}
          mr="2"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
          onClick={(e) => {
            e.stopPropagation();
            listEdit(list.id);
          }}
        />
        <DeleteIcon
          color="red.500"
          cursor={"pointer"}
          _hover={{ transform: "scale(1.5)" }}
          onClick={(e) => {
            e.stopPropagation();
            listDelete(list.id);
          }}
        />
      </Flex>
    );
  }
);

export default TodoItemHeading;
