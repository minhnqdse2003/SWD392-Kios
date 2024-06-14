import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

const SelectedRowModal = ({ isOpen, onClose, selectedRow }) => {
  return (
    <Modal
      placement="top"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      className="h-[calc(100vh-8.5rem)]"
      classNames={{
        wrapper: "justify-end",
      }}
    >
      <ModalContent>
        <ModalHeader>Product Details</ModalHeader>
        <ModalBody>
          {selectedRow && (
            <>
              <label htmlFor="package">Package:</label>
              <Input id="package" value={selectedRow.package} disabled={true} />
              <label htmlFor="invoiceDate">Invoice Date:</label>
              <Input
                id="invoiceDate"
                value={selectedRow.invoiceDate}
                disabled={true}
              />
              <label htmlFor="status">Status:</label>
              <Input id="status" value={selectedRow.status} disabled={true} />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" auto onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectedRowModal;
