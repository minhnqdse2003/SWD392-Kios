"use server";

import { fetchBase } from "./baseAction";

export const getOrder = async () => {
  const data = await fetchBase(`${process.env.API_SECRET_URL}/api/v1/orders`, {
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
