import React from "react";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spinner,
} from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@apollo/client";
import { ALL_TODO_LIST } from "../http/todoAPI";
import TodoItemHeading from "./TodoItemHeading";

const TodoAccordion = observer((props) => {
  const { loading, data: todoLists } = useQuery(ALL_TODO_LIST);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Accordion allowMultiple>
        {todoLists.private.todoLists.map((list) => (
          <AccordionItem key={list.id}>
            <h2>
              <AccordionButton>
                <TodoItemHeading
                  list={list}
                  listEdit={props.listEdit}
                  listDelete={props.listDelete}
                  itemCreate={props.itemCreate}
                />
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
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
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
});

export default TodoAccordion;
