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
  const { listEdit, listDelete, itemCreate, itemToggle, itemEdit, itemDelete } =
    props;
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
                  listEdit={listEdit}
                  listDelete={listDelete}
                  itemCreate={itemCreate}
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
                    itemToggle={itemToggle}
                    itemEdit={itemEdit}
                    itemDelete={itemDelete}
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
