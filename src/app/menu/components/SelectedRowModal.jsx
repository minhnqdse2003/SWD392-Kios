import { useDeleteMenuProduct, usePostMenuProduct } from "@/data/useGetMenu";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdDelete, MdEdit, MdOutlineDescription } from "react-icons/md";

const SelectedRowModal = ({ selectedRow, onClose, isOpen, filters }) => {
  const { mutate: deleteProduct } = useDeleteMenuProduct(onClose, filters);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editedPrice, setEditedPrice] = useState(selectedRow?.price || 0);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(Number(e.target.value));
  };

  const handleDelete = () => {
    if (selectedRow) {
      const deleteData = {
        "menu-id": selectedRow.menuId,
        products: [
          {
            "product-id": selectedRow["product-id"],
          },
        ],
      };
      deleteProduct(deleteData);
    }
  };
  return (
    <>
      <Modal
        placement="top"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        className="h-[calc(100vh-8.5rem)] scrollbar-custom overflow-y-scroll"
        classNames={{
          wrapper: "justify-end",
        }}
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full pr-[15px]">
              Product Details
              <Button
                className="bg-btn text-btn-text"
                type="submit"
                color="primary"
                auto
                onPress={handleDelete}
              >
                <MdDelete size={36} />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedRow && (
              <>
                <label className="w-full h-[300px] border-gray-400 border rounded-3xl flex justify-center items-center cursor-pointer relative ">
                  <div className="relative h-[300px] w-full overflow-hidden ">
                    <img
                      src={selectedRow.url}
                      alt="product"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                </label>

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label="Name"
                  startContent={<LiaUserTagSolid />}
                  name="name"
                  value={selectedRow.name}
                  isDisabled={isDisabled}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label="Price"
                  startContent={<BiSolidDollarCircle />}
                  name="price"
                  value={selectedRow.price}
                  // onChange={handlePriceChange}
                  isDisabled={isDisabled}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label="Product ID"
                  startContent={<MdOutlineDescription />}
                  name="product-id"
                  value={selectedRow["product-id"]}
                  isDisabled={isDisabled}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label="Type"
                  startContent={<MdOutlineDescription />}
                  name="sessionType"
                  value={selectedRow.sessionType}
                  isDisabled={isDisabled}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-between w-full">
              <Button
                className="w-2/5"
                type="button"
                color="default"
                auto
                onPress={onClose}
              >
                Close
              </Button>

              <div className="flex items-center space-x-2.5">
                <Button
                  className="px-0 bg-transparent"
                  size="sm"
                  color={isDisabled}
                  auto
                  onPress={toggleDisabled}
                >
                  <MdEdit color={isDisabled} />
                </Button>
                <Button
                  className="bg-btn text-btn-text"
                  type="submit"
                  color="primary"
                  auto
                  onPress={onClose}
                >
                  Update
                </Button>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectedRowModal;
