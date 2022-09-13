import React from "react";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@apollo/client";
import { ALL_TODO_LIST } from "../http/todoAPI";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TodoAccordion = observer((props) => {
  const { loading, data: todoLists } = useQuery(ALL_TODO_LIST);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Accordion allowMultiple>
      {todoLists.private.todoLists.map((list) => (
        <AccordionItem key={list.id}>
          <Flex>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={list.color}>
                  {list.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <EditIcon
              color={["black"]}
              mr="2"
              cursor={"pointer"}
              _hover={{ transform: "scale(1.5)" }}
              onClick={() => {
                props.listEdit(list.id);
              }}
            />
            <DeleteIcon
              color="red.500"
              cursor={"pointer"}
              _hover={{ transform: "scale(1.5)" }}
            />
          </Flex>
          <AccordionPanel pb={4}>
            {list?.items &&
              list.items.map((item) => (
                <TodoItem key={item.id}>{item.name}</TodoItem>
              ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
});

export default TodoAccordion;
