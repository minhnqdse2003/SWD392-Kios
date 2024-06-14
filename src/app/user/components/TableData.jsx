"use client";

import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import Toast from "@/components/Toast";
import { useGetBusiness } from "@/data/useGetUser";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { Input } from "postcss";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const cols = [
  { key: 1, name: "Name" },
  { key: 4, name: "Bank Account Number" },
  { key: 5, name: "Bank Account Name" },
  { key: 6, name: "Bank Name" },
];

const TableData = () => {
  const { data, error, isLoading } = useGetBusiness();
  const [selectedRow, setSelectedRow] = useState(null);
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

  const onClose = () => {
    reset();
    setInitialFormValue(null);
    setPreviewUrl(null);
    setSelectedRow(null);
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

  const onSelectedRow = (item) => {
    setSelectedRow(item);
    setPreviewUrl(item?.url);
    setInitialFormValue({
      name: item?.name,
      binId: 1,
      bankAccountName: item.bankAccountName,
      bankAccountNumber: item.bankAccountNumber,
      bankName: item.bankName,
      image: item.url,
    });
  };

  const onValueChange = (e) => {
    setInitialFormValue({
      ...initialFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const formParams = [
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

  const processForm = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          {cols.map((item) => (
            <TableColumn isHeader key={item.key}>
              <h5 className="font-bold text-black ">{item.name}</h5>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading ? "No rows to display." : <TableSkeleton />}
        >
          {data?.value?.data.map((item) => (
            <TableRow key={item?.id} onClick={() => onSelectedRow(item)}>
              <TableCell key={item?.id + cols[0].name}>
                <User
                  name={item?.name}
                  avatarProps={{
                    src: item?.url,
                  }}
                  description={item?.email}
                />
              </TableCell>
              <TableCell key={item?.id + cols[1].name}>
                {item["bank-account-number"]}
              </TableCell>

              <TableCell key={item?.id + cols[2].name}>
                {item["bank-account-name"]}
              </TableCell>
              <TableCell key={item?.id + cols[3].name}>
                {item["bank-name"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRow && (
        <Modal
          placement="top"
          isOpen={selectedRow}
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
                        isRequired
                        label={param.label}
                        placeholder={param.placeholder}
                        name={param.name}
                        type={param.type}
                        variant="faded"
                      />
                      {error[param.name]?.message && (
                        <p className="text-sm text-red-400">
                          {error[param.name].message}
                        </p>
                      )}
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter className="flex flex-row justify-between">
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
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      )}

      {error?.message && (
        <Toast message={error.message} open={true} severity={"error"} />
      )}
    </div>
  );
};

export default TableData;
