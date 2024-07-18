import Toast from "@/components/Toast";
import { useGetAllMenu, usePostMenuProduct } from "@/data/useGetMenu";
import { useGetAllProducts } from "@/data/useGetProduct";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const InformationSection = ({ onCLose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const onClose = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    setSelectedMenu(null);
  };

  const { mutate: addProduct, isError, error } = usePostMenuProduct(onClose);
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetAllProducts();
  const {
    data: menuData,
    isLoading: menuLoading,
    error: menuError,
  } = useGetAllMenu();

  const menus = menuData?.value?.data || [];

  const onCLick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAdd = () => {
    if (selectedMenu && selectedProduct) {
      const addData = {
        "menu-id": selectedMenu.id,
        products: [
          {
            "product-id": selectedProduct.id,
            price: selectedProduct.price,
          },
        ],
      };
      addProduct(addData);
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="text-2xl font-bold p-4">Menu</div>
      <Button
        onPress={onCLick}
        className="bg-btn text-btn-text"
        startContent={<IoMdAdd />}
      >
        Add Product
      </Button>

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <ModalHeader>Product Details</ModalHeader>
            <ModalBody>
              <div className="w-full h-[300px] border-gray-400 border rounded-3xl flex justify-center items-center relative overflow-hidden">
                {selectedProduct?.url ? (
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={selectedProduct.url}
                      alt={selectedProduct.name}
                      className="w-full h-full hover:scale-110 transition-all duration-400 object-cover"
                    />
                  </div>
                ) : (
                  <IoMdAdd className="text-4xl text-gray-400" />
                )}
              </div>

              <Select
                label="Select a product"
                placeholder="Choose a product"
                onChange={(e) => {
                  const product = products.find((p) => p.id === e.target.value);
                  setSelectedProduct(product);
                }}
              >
                {products &&
                  products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
              </Select>

              {!menuLoading && (
                <Select
                  label="Select menu"
                  placeholder="Choose menu"
                  onChange={(e) => {
                    const menu = menus.find((m) => m.id === e.target.value);
                    setSelectedMenu(menu);
                  }}
                >
                  {menus.map((menu) => (
                    <SelectItem key={menu.id} value={menu.id}>
                      {menu.title}
                    </SelectItem>
                  ))}
                </Select>
              )}

              {menuLoading && (
                <div className="my-0 mx-auto">
                  <Spinner
                    label="Loading..."
                    color="secondary"
                    labelColor="secondary"
                  />
                </div>
              )}

              <Input
                label="Product Name"
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                isDisabled
              />

              <Input
                label="Price"
                type="number"
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                isDisabled
              />
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
                  Cancel
                </Button>
                <Button
                  className="w-2/5 bg-btn text-btn-text"
                  type="submit"
                  auto
                >
                  Add
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {productsError && (
        <Toast
          open={productsError && true}
          message={productsError.message}
          severity={"error"}
        />
      )}

      {menuError && (
        <Toast
          open={menuError && true}
          message={menuError.message}
          severity={"error"}
        />
      )}

      {isError && (
        <Toast
          open={isError}
          message={
            error?.message || "An error occurred while adding the product."
          }
          severity="error"
        />
      )}
    </div>
  );
};

export default InformationSection;
