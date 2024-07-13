"use server";

import { fetchBase } from "./baseAction";

export const getProduct = async (data) => {
  const { page, name, code, isAscOrder, status, categoryId, businessID } = data;

  const filters = {
    Name: name || null,
    Code: code || null,
    SortOrder: isAscOrder || null,
    Status: status || null,
    CategoryID: categoryId || null,
    BusinessID: businessID || null,
    PageNumber: page || 1,
    PageSize: null,
  };
  const filteredParam = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null)
  );

  const res = await fetchBase(
    `${process.env.API_SECRET_URL}/api/v1/products?` +
      new URLSearchParams(filteredParam)
  );

  return res;
};

export const postProduct = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/products`;

  const res = await fetchBase(url, {
    body: data,
    method: "POST",
  });

  return res;
};

export const deleteProduct = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/products/${id}`;

  const res = await fetchBase(url, {
    method: "DELETE",
  });

  return res;
};

export const updateProduct = async (formData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/products`;

  const res = await fetchBase(url, {
    body: formData,
    method: "PUT",
  });

  return res;
};
