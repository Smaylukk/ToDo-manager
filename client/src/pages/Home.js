import React, { useCallback, useState } from "react";
import NavBar from "../components/NavBar";
import { observer } from "mobx-react-lite";
import Tumbler from "../components/Tumbler";
import TodoGrid from "../components/TodoGrid";
import TodoAccordion from "../components/TodoAccordion";
import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ALL_TODO_LIST,
  DELETE_TODO_ITEM,
  DELETE_TODO_LIST,
  TODO_LIST,
  TOOGLE_TODO_ITEM,
} from "../http/todoAPI";
import ModalEditList from "../components/modals/ModalEditList";
import ModalLoader from "../components/modals/ModalLoader";
import ModalEditItem from "../components/modals/ModalEditItem";

const Home = observer(() => {
  // LIST
  const [listId, setListId] = useState("");
  const [todoListData, setTodoListData] = useState({});
  const [viewMode, setViewMode] = useState("0");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLoader,
    onOpen: onOpenLoader,
    onClose: onCloseLoader,
  } = useDisclosure();
  // ITEM
  const [itemId, setItemId] = useState(null);
  const {
    isOpen: isOpenItem,
    onOpen: onOpenItem,
    onClose: onCloseItem,
  } = useDisclosure();
  const [todoItemData, setTodoItemData] = useState({});
  //LIST
  const { refetch: updateTodoList } = useQuery(TODO_LIST, {
    variables: { todoList: listId },
    fetchPolicy: "no-cache",
  });

  const [deleteTodoList] = useMutation(DELETE_TODO_LIST, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const HandleListEdit = useCallback(async (id) => {
    setListId(id);
    updateTodoList({ todoList: id }).then((res) => {
      const { data } = res;
      if (data.private.todoList) {
        setTodoListData(data.private.todoList);
        onOpen();
      }
    });
    // eslint-disable-next-line
  }, []);
  const HandleListDelete = useCallback(async (id) => {
    onOpenLoader();
    deleteTodoList({ variables: { id } }).finally(() => onCloseLoader());
    // eslint-disable-next-line
  }, []);
  const HandleCreateTodoList = (e) => {
    e.preventDefault();

    setListId(null);
    setTodoListData(null);
    onOpen();
  };

  // ITEM
  const { refetch: updateTodoItem } = useQuery(TODO_LIST, {
    variables: { todoItem: itemId },
    fetchPolicy: "no-cache",
  });
  const [deleteTodoItem] = useMutation(DELETE_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });
  const [toogleTodoItem] = useMutation(TOOGLE_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const HandleItemEdit = useCallback(async (id) => {
    setItemId(id);
    updateTodoItem({ todoItem: id }).then((res) => {
      const { data } = res;
      if (data.private.todoItem) {
        setTodoItemData(data.private.todoItem);
        onOpen();
      }
    });
    // eslint-disable-next-line
  }, []);
  const HandleItemDelete = useCallback(async (id) => {
    await deleteTodoItem({ variables: { id } });
    // eslint-disable-next-line
  }, []);
  const HandleItemCreate = useCallback(async (id) => {
    setListId(id);
    setItemId(null);
    setTodoItemData(null);
    onOpenItem();
    // eslint-disable-next-line
  }, []);
  const HandleItemToogle = useCallback(async (id) => {
    await toogleTodoItem({ variables: { id } });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      <Stack
        spacing={8}
        direction="row"
        align="center"
        mx={2}
        my={2}
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
          + Створти новий список
        </Button>
      </Stack>
      {viewMode === "1" ? (
        <TodoGrid
          listEdit={HandleListEdit}
          listDelete={HandleListDelete}
          itemEdit={HandleItemEdit}
          itemDelete={HandleItemDelete}
          itemCreate={HandleItemCreate}
          itemToogle={HandleItemToogle}
        />
      ) : (
        <TodoAccordion
          listEdit={HandleListEdit}
          listDelete={HandleListDelete}
          itemEdit={HandleItemEdit}
          itemDelete={HandleItemDelete}
          itemCreate={HandleItemCreate}
          itemToogle={HandleItemToogle}
        />
      )}

      <ModalEditList
        isOpen={isOpen}
        onClose={onClose}
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
