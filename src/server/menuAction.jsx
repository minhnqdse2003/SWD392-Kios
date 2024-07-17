"use server";

import { fetchBase } from "./baseAction";

export const getMenu = async (data) => {
  const { page, type, businessID } = data;

  const filters = {
    Type: type || null,
    BusinessID: businessID || null,
    PageNumber: page || 1,
    PageSize: null, 
    };

  const filteredParam = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null)
  );

  const url = `${process.env.API_SECRET_URL}/api/v1/menus?${new URLSearchParams(filteredParam)}`;
  
  const res = await fetchBase(url, {
    method: "GET",
  });
  
  return res;
};

export const getAllMenu = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/menus`;

  const res = await fetchBase(url, {
    method: "GET",
  });

  return res;
};

export const postMenuProduct = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/menus/products`;

  const res = await fetchBase(url, {
    body: JSON.stringify(data), 
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
  });

  return res;
};

export const deleteMenuProduct = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/menus/products`;

  const res = await fetchBase(url, {
    body: JSON.stringify(data),
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res;
};