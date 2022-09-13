import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@apollo/client";
import { ALL_TODO_LIST } from "../http/todoAPI";

const TodoGrid = observer(() => {
  const { loading, data: todoLists } = useQuery(ALL_TODO_LIST);

  if (loading) {
    return <Spinner />;
  }
  /*const items = [
    { name: "Item 1", color: "blue.500" },
    { name: "Item 2", color: "black" },
    { name: "Item 3", color: "red" },
    { name: "Item 4", color: "green" },
    { name: "Item 5", color: "gray.500" },
    { name: "Item 6", color: "yellow" },
  ];*/
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {todoLists.private.todoLists.map((list) => (
        <GridItem w="100%" border={"3px solid"} borderRadius={10} key={list.id}>
          <Heading>
            <Text color={list.color}>{list.name}</Text>
          </Heading>
          {list?.items &&
            list.items.map((item) => (
              <TodoItem key={item.id}>{item.name}</TodoItem>
            ))}
        </GridItem>
      ))}
    </Grid>
  );
});

export default TodoGrid;
