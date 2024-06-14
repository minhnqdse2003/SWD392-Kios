"use server";

export const getOrder = async () => {
  const data = await fetch(`${process.env.API_SECRET_URL}/api/v1/orders`, {
    method: "GET",
  });

  if (!data.ok) {
    throw new Error("Network response was not ok");
  }

  return data.json();
};

export const putOrderStatus = async (requestedData) => {
  const res = await fetch(`${process.env.API_SECRET_URL}/api/v1/orders`, {
    method: "PUT",
    body: JSON.stringify(requestedData),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
