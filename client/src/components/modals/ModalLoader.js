import React from "react";
import { observer } from "mobx-react-lite";
import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";

const ModalLoader = observer((props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <Spinner label={"Loading"} variant={"analytics"} />
      </ModalContent>
    </Modal>
  );
});

export default ModalLoader;
