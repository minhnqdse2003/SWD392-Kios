import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdOutlineDescription, MdDelete, MdEdit } from "react-icons/md";
import { BiSolidDollarCircle } from "react-icons/bi";
import { useDeleteProduct, useUpdateProduct } from "@/data/useGetProduct";
import { IoMdAdd } from "react-icons/io";
import { objectToFormData } from "@/utils/getObject";

const categories = [
  {
    name: "Soft Drinks",
    value: 1,
  },
  {
    name: "Tea & Coffee",
    value: 2,
  },
];

const SelectedRowModal = ({ isOpen, onClose, selectedRow, filterParams }) => {
  const { mutate: deleteProduct } = useDeleteProduct(onClose);
  const { mutate: updateProduct } = useUpdateProduct(onClose, filterParams);
  const [isDisabled, setIsDisabled] = useState(true);

  const [id, setId] = useState(selectedRow?.id);
  const [name, setName] = useState(selectedRow?.name || "");
  const [code, setCode] = useState(selectedRow?.code || "");
  const [description, setDescription] = useState(
    selectedRow?.description || ""
  );
  const [price, setPrice] = useState(selectedRow?.price || "");
  const [categoryid, setCategory] = useState("");
  const [status, setStatus] = useState(selectedRow?.status || false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [initialFormValue, setInitialFormValue] = useState({});
  const [isIncludeImage, setIsIncludeImage] = useState({
    isImport: false,
    message: null,
  });
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
    categoryid: "",
    status: false,
    imagefile: null,
  });

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        name: selectedRow.name || "",
        code: selectedRow.code || "",
        description: selectedRow.description || "",
        price: selectedRow.price || "",
        categoryid: selectedRow["category-id"] || "",
        status: selectedRow.status || false,
        imagefile: null,
      });
      setPreviewUrl(selectedRow.url || "");
    }
  }, [selectedRow]);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleDelete = () => {
    if (selectedRow?.id) {
      console.log("Delete product", selectedRow.id);
      deleteProduct(selectedRow.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (selectedRow?.id) {
      const formObject = {
        id: selectedRow.id,
        name: formData.name,
        code: formData.code,
        description: formData.description,
        price: parseFloat(formData.price),
        status: formData.status,
        categoryid: parseInt(formData.categoryid),
      };

      if (formData.imagefile) {
        formObject.ImageFile = formData.imagefile;
      }

      const formDataObj = objectToFormData(formObject);

      updateProduct(formDataObj);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      alert("Invalid image format. Please select a JPEG, PNG, or GIF image.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      imagefile: selectedFile,
    }));
    setImageFile(selectedFile);
    setIsIncludeImage({ isImport: true, message: null });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
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
                  {previewUrl ? (
                    <div className="relative h-[300px] w-full overflow-hidden ">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full hover:scale-110 transition-all duration-400 object-cover"
                      />
                    </div>
                  ) : (
                    <IoMdAdd className="text-4xl text-gray-400" />
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    name="imagefile"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    disabled={isDisabled}
                  />
                </label>
                {isIncludeImage?.message && (
                  <p className="text-sm text-red-400">
                    {isIncludeImage.message}
                  </p>
                )}

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label={"Name"}
                  startContent={<LiaUserTagSolid />}
                  name={"name"}
                  value={formData.name}
                  disabled={isDisabled}
                  onChange={handleInputChange}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  label={"Code"}
                  startContent={<LiaUserTagSolid />}
                  name={"code"}
                  value={formData.code}
                  disabled={isDisabled}
                  onChange={handleInputChange}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  name={"description"}
                  value={formData.description}
                  label={"Description"}
                  startContent={<MdOutlineDescription />}
                  disabled={isDisabled}
                  onChange={handleInputChange}
                />

                <Input
                  variant={isDisabled ? "flat" : "bordered"}
                  name={"price"}
                  value={formData.price}
                  label={"Price"}
                  startContent={<BiSolidDollarCircle />}
                  disabled={isDisabled}
                  onChange={handleInputChange}
                />

                <Select
                  variant={isDisabled ? "flat" : "bordered"}
                  label="Category"
                  placeholder="Select a category"
                  selectionMode="single"
                  name="categoryid"
                  className="w-full"
                  isDisabled={isDisabled}
                  selectedKeys={
                    formData.categoryid ? [formData.categoryid.toString()] : []
                  }
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      categoryid: e.target.value,
                    }));
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value.toString()}
                      value={category.value.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>

                <Switch
                  isSelected={formData.status}
                  size="lg"
                  color="primary"
                  isDisabled={isDisabled}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      status: e.target.checked,
                    }))
                  }
                >
                  {formData.status ? "Active" : "Inactive"}
                </Switch>
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
              <div className="flex items-center space-x-2.5 ">
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
                  onPress={handleUpdate}
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
