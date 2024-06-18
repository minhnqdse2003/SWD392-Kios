"use server";

import { fetchBase } from "./baseAction";

export const getBusiness = async () => {
  const data = await fetchBase(
    `${process.env.API_SECRET_URL}/api/v1/businesses`,
    {
      method: "GET",
    }
  );

  return data;
};

export const postUser = async (requestedData) => {
  const data = await fetchBase(
    `${process.env.API_SECRET_URL}/api/v1/businesses`,
    {
      method: "POST",
      body: requestedData,
    }
  );
  return data;
};
