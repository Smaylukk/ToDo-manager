import React from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Flex,
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
  Text,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ModalEditList = observer((props) => {
  const { isOpen, onClose } = props;
  return (
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
  );
});

export default ModalEditList();
