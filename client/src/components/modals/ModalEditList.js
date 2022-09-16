import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import {
  ADD_TODO_LIST,
  ALL_TODO_LIST,
  SAVE_TODO_LIST,
} from "../../http/todoAPI";
import { Context } from "../../index";

const ModalEditList = observer((props) => {
  const { user } = useContext(Context);
  const [listName, setListName] = useState("");
  const [listColor, setListColor] = useState("");
  const { isOpen, onClose, listId, todoListData } = props;

  useEffect(() => {
    if (todoListData) {
      setListName(todoListData.name);
      setListColor(todoListData.color);
    } else {
      setListName("");
      setListColor("");
    }
  }, [todoListData]);
  const [addTodoList] = useMutation(ADD_TODO_LIST, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });
  const [saveTodoList] = useMutation(SAVE_TODO_LIST, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const saveList = () => {
    if (listId) {
      // save list
      saveTodoList({
        variables: {
          id: listId,
          name: listName,
          color: listColor,
        },
      })
        .then(() => {
          onClose();
        })
        .catch((err) => alert(err));
    } else {
      // create list
      addTodoList({
        variables: {
          name: listName,
          color: listColor,
          user: user.user.id,
        },
      })
        .then(() => {
          onClose();
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {listId ? "Редагування списку" : "Створення списку"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Назва</FormLabel>
            <Input
              placeholder="Назва списку"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Колір</FormLabel>
            <Input
              type={"color"}
              value={listColor}
              onChange={(e) => setListColor(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={saveList}>
            Зберегти
          </Button>
          <Button onClick={onClose}>Відміна</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalEditList;
