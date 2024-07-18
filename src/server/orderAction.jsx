"use server";

import { fetchBase } from "./baseAction";

export const getOrder = async (searchParams = {}) => {
  const { page = 1 } = searchParams;
  const filters = {
    PageNumber: page,
    PageSize: 10,
  };

  const url = `${process.env.API_SECRET_URL}/api/v1/orders?` + new URLSearchParams(filters);
  
  const data = await fetchBase(url, {
    method: "GET",
  });

  return data;
};

export const putOrderStatus = async (requestedData) => {
  const res = await fetchBase(`${process.env.API_SECRET_URL}/api/v1/orders`, {
    method: "PUT",
    body: JSON.stringify(requestedData),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  return res;
};

export const getOrderById = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/orders/${id}`;

  const res = await fetchBase(url, {
    method: "GET",
  });
  
  return res;
};

export const deleteOrder = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/orders/${id}`;

  const res = await fetchBase(url, {
    method: "DELETE",
  });
  
  return res;
};
