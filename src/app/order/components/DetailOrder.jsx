"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteOrder,
  useGetOrderById,
  usePostOrderStatus,
} from "@/data/useOrderData";
import { calculateTimePassed } from "@/utils/displayUtils";
import {
  Card,
  CardBody,
  Divider,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import Toast from "@/components/Toast";

const orderItemCols = [
  { key: "name", name: "Product Name" },
  { key: "quantity", name: "Quantity" },
  { key: "size", name: "Size" },
  { key: "unit-price", name: "Unit Price" },
  { key: "price", name: "Total Price" },
];

const selectionOption = [
  { key: "OnPreparing", label: "On Preparing" },
  { key: "Prepared", label: "Prepared" },
  { key: "OnDelivering", label: "On Delivering" },
  { key: "Delivered", label: "Delivered" },
];

const DetailOrder = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { data, error, isLoading } = useGetOrderById(id);
  const {
    mutate: mutateOrderStatus,
    error: mutateOrderStatusError,
    isSuccess: mutateOrderStatusSuccess,
  } = usePostOrderStatus();
  const {
    mutate: deleteOrder,
    error: deleteOrderError,
    isSuccess: deleteOrderSuccess,
  } = useDeleteOrder();

  const handleStatusChange = (e) => {
    const requestedData = {
      id: order.id,
      status: e.target.value,
    };

    mutateOrderStatus(requestedData);
  };

  const handleDeleteOrder = () => {
    deleteOrder(order.id, {
      onSuccess: () => {
        router.push("/order");
      },
    });
  };

  if (isLoading) {
    return <Spinner label="Loading order details..." />;
  }

  if (error) {
    return <Toast message={error.message} open={true} severity="error" />;
  }

  if (!data || !data.value) {
    return <div>No order found</div>;
  }

  const order = data.value;

  return (
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">{order.id} Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Order ID:</p>
            <p>{order.id}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Select
              value={order.status}
              onChange={handleStatusChange}
              className="max-w-xs"
              placeholder={order.status}
            >
              {selectionOption.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>{order.location}</p>
          </div>
          <div>
            <p className="font-semibold">Total:</p>
            <p>{order.total} VNĐ</p>
          </div>
          <div>
            <p className="font-semibold">Note:</p>
            <p>{order.note || "No note"}</p>
          </div>
          <div>
            <p className="font-semibold">Order Time:</p>
            <p>{calculateTimePassed(new Date(order["ngay-tao"]))}</p>
          </div>
          <div>
            <p className="font-semibold">Shipper Name:</p>
            <p>{order["shipper-name"] || "Not assigned"}</p>
          </div>
        </div>

        <Divider className="my-4" />

        <h3 className="text-xl font-bold mb-2">Order Items</h3>
        <Table aria-label="Order items table">
          <TableHeader>
            {orderItemCols.map((column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {order.products && order.products.length > 0 ? (
              order.products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item["unit-price"]} VNĐ</TableCell>
                  <TableCell>{item.price} VNĐ</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={orderItemCols.length}>
                  No items in this order
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Button color="danger" onClick={handleDeleteOrder}>
            Delete Order
          </Button>
        </div>

        {deleteOrderError && (
          <Toast
            message={deleteOrderError.message}
            open={true}
            severity="error"
          />
        )}

        {deleteOrderSuccess && (
          <Toast
            message="Order deleted successfully"
            open={true}
            severity="success"
          />
        )}

        {mutateOrderStatusError && (
          <Toast
            message={mutateOrderStatusError.message}
            open={true}
            severity="error"
          />
        )}

        {mutateOrderStatusSuccess && (
          <Toast
            message="Update status successfully"
            open={true}
            severity="success"
          />
        )}
      </CardBody>
    </Card>
  );
};

export default DetailOrder;
