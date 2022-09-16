import React, { useRef, useState } from "react";
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
  ADD_TODO_ITEM,
  ALL_TODO_LIST,
  SAVE_TODO_ITEM,
} from "../../http/todoAPI";

const ModalEditItem = observer((props) => {
  const [itemName, setItemName] = useState("");
  const { isOpen, onClose, itemId, listId } = props;
  const itemNameRef = useRef(null);

  const [addTodoItem] = useMutation(ADD_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });
  const [saveTodoItem] = useMutation(SAVE_TODO_ITEM, {
    refetchQueries: () => [
      {
        query: ALL_TODO_LIST,
        variables: {},
      },
    ],
  });

  const saveItem = () => {
    if (itemId) {
      // save list
      saveTodoItem({
        variables: {
          id: itemId,
          name: itemName,
        },
      })
        .then(() => {
          setItemName("");
          onClose();
        })
        .catch((err) => alert(err));
    } else {
      // create list
      addTodoItem({
        variables: {
          name: itemName,
          todoList: listId,
        },
      })
        .then(() => {
          setItemName("");
          onClose();
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={itemNameRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {itemId ? "Редагування завдання" : "Створення завдання"}
        </ModalHeader>
        <ModalCloseButton />
        <form
          onClick={(e) => {
            e.preventDefault();
            if (itemName) {
              saveItem();
            }
          }}
        >
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Назва</FormLabel>
              <Input
                ref={itemNameRef}
                placeholder="Назва завдання"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type={"submit"}>
              Зберегти
            </Button>
            <Button onClick={onClose}>Відміна</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

export default ModalEditItem;
