import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@apollo/client";
import { ALL_TODO_LIST } from "../http/todoAPI";
import TodoItemHeading from "./TodoItemHeading";

const TodoGrid = observer((props) => {
  const { loading, data: todoLists } = useQuery(ALL_TODO_LIST);

  if (loading) {
    return <Spinner />;
  }

  return (
    <SimpleGrid gap={3} minChildWidth={"350px"}>
      {todoLists.private.todoLists.map((list) => (
        <Box
          colSpan={3}
          maxW={400}
          border={"3px solid"}
          borderRadius={10}
          key={list.id}
          borderColor={list.color}
        >
          <Heading>
            <TodoItemHeading
              list={list}
              listEdit={props.listEdit}
              listDelete={props.listDelete}
              itemCreate={props.itemCreate}
            />
          </Heading>
          {list?.items &&
            list.items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                itemToogle={props.itemToogle}
                itemEdit={props.itemEdit}
                itemDelete={props.itemDelete}
              >
                {item.name}
              </TodoItem>
            ))}
        </Box>
      ))}
    </SimpleGrid>
  );
});

export default TodoGrid;
