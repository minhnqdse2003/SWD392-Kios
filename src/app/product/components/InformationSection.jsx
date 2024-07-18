import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Switch,
} from "@nextui-org/react";
import React, { useState } from "react";
import { LiaUserTagSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { BiSolidDollarCircle } from "react-icons/bi";
import { addProductSchema } from "@/schemas/productAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostProduct } from "@/data/useGetProduct";
import Toast from "@/components/Toast";
import { getSearchParamsObject, objectToFormData } from "@/utils/getObject";
import { useSearchParams } from "next/navigation";

const InformationSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const searchParam = useSearchParams();
  const currentSearchParam = getSearchParamsObject(searchParam);

  const [initialFormValue, setInitialFormValue] = useState({
    name: "",
    description: "",
    price: 1,
    status: true,
    category: "",
    image: null,
  });

  const [isIncludeImage, setIsIncludeImage] = useState({
    message: null,
    isImport: false,
  });

  const onValueChange = (e) => {
    setInitialFormValue({
      ...initialFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const formParams = [
    {
      label: "Name",
      placeholder: "Enter product name...",
      startContent: <LiaUserTagSolid />,
      name: "name",
      value: initialFormValue.name,
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Description",
      placeholder: "Enter product description...",
      startContent: <MdOutlineDescription />,
      name: "description",
      value: initialFormValue.description,
      onChange: onValueChange,
      type: "textarea",
    },
    {
      label: "Price",
      placeholder: "Enter product price...",
      startContent: <BiSolidDollarCircle />,
      name: "price",
      value: initialFormValue.price,
      onChange: onValueChange,
      type: "number",
    },
  ];

  const onClose = () => {
    setInitialFormValue({
      name: "",
      description: "",
      price: "",
      status: true,
      category: "",
      image: null,
    });
    setPreviewUrl("");
    reset();
    setIsOpen(false);
  };

  const onCLick = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeStatus = () => {
    setInitialFormValue({
      ...initialFormValue,
      status: !initialFormValue.status,
    });
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      alert("Invalid image format. Please select a JPEG, PNG, or GIF image.");
      return;
    }

    setInitialFormValue({ ...initialFormValue, image: selectedFile });
    setIsIncludeImage({ ...isIncludeImage, isImport: true, message: null });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const categories = [
    {
      name: "Tea & Coffee",
      value: 2,
    },
    {
      name: "Soft Drinks",
      value: 1,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const mutation = usePostProduct(onClose, currentSearchParam);

  const processForm = async (data) => {
    if (!isIncludeImage.isImport) {
      setIsIncludeImage({
        ...isIncludeImage,
        message: "Image is required in this form",
      });
      return;
    }

    const formObject = {
      Name: data.name,
      Code: "Test 1",
      Description: data.description,
      Price: data.price,
      Status: data.status,
      ImageFile: initialFormValue.image,
      CategoryID: data.category,
    };

    const formData = objectToFormData(formObject);

    mutation.mutate(formData);
  };

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="text-2xl font-bold p-4">Product</div>
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
          <form onSubmit={handleSubmit(processForm)}>
            <ModalHeader>Product Details</ModalHeader>
            <ModalBody>
              <label className="w-full h-[300px] border-gray-400 border rounded-3xl flex justify-center items-center cursor-pointer relative overflow-hidden">
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
                  id="imageUpload" // Set ID for label association
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
              {isIncludeImage?.message && (
                <p className="text-sm text-red-400">{isIncludeImage.message}</p>
              )}

              {formParams.map((param) => (
                <>
                  <Input
                    key={param.label}
                    label={param.label}
                    placeholder={param.placeholder}
                    startContent={param.startContent}
                    name={param.name}
                    {...register(param.name)}
                    type={param.type}
                  />
                  {error[param.name]?.message && (
                    <p className="text-sm text-red-400">
                      {error[param.name].message}
                    </p>
                  )}
                </>
              ))}
              <Select
                label="Category"
                placeholder="Select a category"
                selectionMode="single"
                name="category"
                value={initialFormValue?.category || "Drink"}
                {...register("category")}
                className="w-full"
              >
                {categories.map((category) => (
                  <SelectItem key={category.value}>{category.name}</SelectItem>
                ))}
              </Select>
              {error.category?.message && (
                <p className="text-sm text-red-400">{error.category.message}</p>
              )}
              <Switch
                isSelected={initialFormValue.status}
                onValueChange={onChangeStatus}
                size="lg"
                {...register("status")}
                color="primary"
              >
                {initialFormValue.status ? "Active" : "Inactive"}
              </Switch>
            </ModalBody>
            <ModalFooter>
              {!mutation.isPending && (
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
                  </Button>{" "}
                </div>
              )}

              {mutation.isPending && (
                <div className="my-0 mx-auto">
                  <Spinner
                    label="Loading..."
                    color="secondary"
                    labelColor="secondary"
                  />
                </div>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {mutation.error && (
        <Toast
          open={mutation.error && true}
          message={mutation.error.message}
          severity={"error"}
        />
      )}
    </div>
  );
};

export default InformationSection;
