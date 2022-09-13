import React, { useCallback, useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { observer } from "mobx-react-lite";
import Tumbler from "../components/Tumbler";
import TodoGrid from "../components/TodoGrid";
import TodoAccordion from "../components/TodoAccordion";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO_LIST, ALL_TODO_LIST, TODO_LIST } from "../http/todoAPI";
import { Context } from "../index";

const Home = observer(() => {
  const { user } = useContext(Context);
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");
  const [listId, setListId] = useState("");
  const [viewMode, setViewMode] = useState("0");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { refetch: updateTodoList } = useQuery(TODO_LIST, {
    variables: { todoList: listId },
    fetchPolicy: "no-cache",
  });

  const [addTodoList] = useMutation(ADD_TODO_LIST, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const HandleListEdit = useCallback(async (id) => {
    setListId(id);
    console.log(id);
    updateTodoList({ todoList: id }).then((res) => {
      const { data } = res;
      console.log(data);
      if (data.private.todoList) {
        setListName(data.private.todoList.name);
        setListColor(data.private.todoList.color);
        onOpen();
      }
    });
  }, []);

  const SaveList = (e) => {
    if (listId) {
      // save list
    } else {
      // create list
      addTodoList({
        variables: {
          name: listName,
          color: listColor,
          user: user.user.id,
        },
      })
        .then((data) => {
          onClose();
        })
        .catch((err) => alert(err));
    }
  };

  const createTodoList = (e) => {
    e.preventDefault();
    setListName("");
    setListColor("");

    setListId(null);
    onOpen();
  };

  return (
    <>
      <NavBar />
      <Stack spacing={8} direction="row" align="center" mb={3}>
        <Tumbler viewMode={viewMode} changeViewMode={setViewMode} />{" "}
        <Button
          colorScheme="teal"
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          px={5}
          py={2}
          onClick={createTodoList}
        >
          + Створти новий список
        </Button>
      </Stack>
      {viewMode === "1" ? (
        <TodoGrid listEdit={HandleListEdit} />
      ) : (
        <TodoAccordion listEdit={HandleListEdit} />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Назва</FormLabel>
              <Input
                placeholder="Навза списку"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Колір</FormLabel>
              <Input
                type={"color"}
                value={listColor}
                onChange={(e) => {
                  setListColor(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={SaveList}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default Home;
