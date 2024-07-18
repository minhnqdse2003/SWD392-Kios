"use server";

import { fetchBase } from "./baseAction";

export const getBusiness = async (data) => {
  const { name, email, bankName } = data;
  const filters = {
    name: name || null,
    email: email || null,
    "bank-name": bankName || null,
    "page-number": data["page-number"] || 1,
  };
  const filteredParam = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null)
  );
  const respone = await fetchBase(
    `${process.env.API_SECRET_URL}/api/v1/businesses?` +
      new URLSearchParams(filteredParam),
    {
      method: "GET",
    }
  );
  return respone;
};

export const postUser = async (data) => {
  const res = await fetchBase(
    `${process.env.API_SECRET_URL}/api/v1/businesses`,
    {
      method: "POST",
      body: data,
    }
  );
  return res;
};

export const deleteBusiness = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/businesses/${id}`;

  const res = await fetchBase(url, {
    method: "DELETE",
  });

  return res;
};

export const getBusinessDashboard = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/sales`;

  const res = await fetchBase(url, {
    method: "GET",
  });

  return res;
};

export const updateBusiness = async (formData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/businesses`;

  const res = await fetchBase(url, {
    method: "PUT",
    body: formData,
  });

  return res;
};
