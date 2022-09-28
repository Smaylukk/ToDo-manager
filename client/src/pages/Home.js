import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { observer } from "mobx-react-lite";
import Tumbler from "../components/Tumbler";
import TodoGrid from "../components/TodoGrid";
import TodoAccordion from "../components/TodoAccordion";
import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import ModalEditList from "../components/modals/ModalEditList";
import ModalLoader from "../components/modals/ModalLoader";
import ModalEditItem from "../components/modals/ModalEditItem";
import useTodo from "../hooks/useTodo";

const Home = observer(() => {
  // LIST
  const [viewMode, setViewMode] = useState("0");
  const {
    isOpen: isOpenList,
    onOpen: onOpenList,
    onClose: onCloseList,
  } = useDisclosure();
  const {
    isOpen: isOpenLoader,
    onOpen: onOpenLoader,
    onClose: onCloseLoader,
  } = useDisclosure();
  // ITEM
  const {
    isOpen: isOpenItem,
    onOpen: onOpenItem,
    onClose: onCloseItem,
  } = useDisclosure();
  const [
    listId,
    todoListData,
    itemId,
    todoItemData,
    HandleListEdit,
    HandleListDelete,
    HandleCreateTodoList,
    HandleItemEdit,
    HandleItemDelete,
    HandleItemCreate,
    HandleItemToggle,
  ] = useTodo(onOpenList, onOpenItem, onOpenLoader, onCloseLoader);

  return (
    <>
      <NavBar />
      <Stack
        spacing={2}
        direction="column"
        align="flex-start"
        mx={2}
        //my={2}
        wrap={"wrap"}
      >
        <Tumbler viewMode={viewMode} changeViewMode={setViewMode} />{" "}
        <Button
          colorScheme="teal"
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          px={5}
          py={2}
          onClick={HandleCreateTodoList}
        >
          + Новий список
        </Button>
      </Stack>
      {viewMode === "1" ? (
        <TodoGrid
          listEdit={HandleListEdit}
          listDelete={HandleListDelete}
          itemEdit={HandleItemEdit}
          itemDelete={HandleItemDelete}
          itemCreate={HandleItemCreate}
          itemToggle={HandleItemToggle}
        />
      ) : (
        <TodoAccordion
          listEdit={HandleListEdit}
          listDelete={HandleListDelete}
          itemEdit={HandleItemEdit}
          itemDelete={HandleItemDelete}
          itemCreate={HandleItemCreate}
          itemToggle={HandleItemToggle}
        />
      )}

      <ModalEditList
        isOpen={isOpenList}
        onClose={onCloseList}
        listId={listId}
        todoListData={todoListData}
      />
      <ModalEditItem
        isOpen={isOpenItem}
        onClose={onCloseItem}
        itemId={itemId}
        listId={listId}
        todoItemData={todoItemData}
      />
      <ModalLoader isOpen={isOpenLoader} onClose={onCloseLoader} />
    </>
  );
});

export default Home;
