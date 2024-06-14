"use server";

export const getBusiness = async () => {
  const data = await fetch(`${process.env.API_SECRET_URL}/api/v1/businesses`, {
    method: "GET",
  });

  if (!data.ok) {
    throw new Error("Network response was not ok");
  }

  return data.json();
};

export const postUser = async (requestedData) => {
  const data = await fetch(`${process.env.API_SECRET_URL}/api/v1/businesses`, {
    method: "POST",
    body: requestedData,
  });

  if (!data.ok) {
    throw new Error("Network response was not ok");
  }

  return data.json();
};
