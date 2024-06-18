"use client";
import Toast from "@/components/Toast";
import { usePostBusiness } from "@/data/useGetUser";
import { addUserSchema } from "@/schemas/userAuth";
import { objectToFormData } from "@/utils/getObject";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

const InformationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isIncludeImage, setIsIncludeImage] = useState({
    message: null,
    isImport: false,
  });

  const [initialFormValue, setInitialFormValue] = useState({
    name: null,
    binId: null,
    bankAccountName: null,
    bankAccountNumber: null,
    bankName: null,
    image: null,
  });

  const onCLick = () => {
    setIsOpen((prev) => !prev);
  };

  const onClose = () => {
    reset();
    setInitialFormValue(null);
    setPreviewUrl(null);
    setIsOpen(false);
  };

  const onValueChange = (e) => {
    setInitialFormValue({
      ...initialFormValue,
      [e.target.name]: e.target.value,
    });
  };

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
      BinId: data.binId,
      BankAccountName: data.bankAccountName,
      BankAccountNumber: data.bankAccountNumber,
      BankName: data.bankName,
      ImageFile: initialFormValue.image,
      Email: data.email,
    };

    const formData = objectToFormData(formObject);

    mutateUserData(formData);
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

  const formParams = [
    {
      label: "Email",
      placeholder: "Enter business email...",
      name: "email",
      value: initialFormValue?.email || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Name",
      placeholder: "Enter business name...",
      name: "name",
      value: initialFormValue?.name || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bin Id",
      placeholder: "Enter bin...",
      name: "binId",
      value: initialFormValue?.binId || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Account Name",
      placeholder: "Enter Bank Account Name...",
      name: "bankAccountName",
      value: initialFormValue?.bankAccountName || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Account Number",
      placeholder: "Enter Bank Account Number...",
      name: "bankAccountNumber",
      value: initialFormValue?.bankAccountNumber || "",
      onChange: onValueChange,
      type: "text",
    },
    {
      label: "Bank Name",
      placeholder: "Enter Bank Name...",
      name: "bankName",
      value: initialFormValue?.bankName || "",
      onChange: onValueChange,
      type: "text",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error },
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const {
    mutate: mutateUserData,
    error: mutateUserDataError,
    isPending: mutateUserDataPendingStatus,
  } = usePostBusiness(onClose);

  return (
    <div className="flex flex-row justify-between w-full">
      <span className="text-2xl font-bold p-4">User</span>
      <Button
        onPress={onCLick}
        className="bg-btn text-btn-text"
        startContent={<IoMdAdd />}
      >
        Add User
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
          {(onClose) => (
            <form onSubmit={handleSubmit(processForm)}>
              <ModalHeader>User Details</ModalHeader>
              <ModalBody>
                <label
                  key="image"
                  className="w-full h-[300px] border-gray-400 border rounded-3xl flex justify-center items-center cursor-pointer relative overflow-hidden"
                >
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
                    key="input image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
                {formParams.map((param) => (
                  <div key={param.label}>
                    <Input
                      label={param.label}
                      placeholder={param.placeholder}
                      name={param.name}
                      type={param.type}
                      variant="faded"
                      {...register(param.name)}
                    />
                    {error[param.name]?.message && (
                      <p className="text-sm text-red-400 mt-2">
                        {error[param.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                {!mutateUserDataPendingStatus && (
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

                {mutateUserDataPendingStatus && (
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
          )}
        </ModalContent>
      </Modal>

      {mutateUserDataError && (
        <Toast
          message={mutateUserDataError.message}
          open={true}
          severity={"error"}
        />
      )}
    </div>
  );
};

export default InformationHeader;
