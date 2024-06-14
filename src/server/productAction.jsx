"use server";

export const getProduct = async ({ page, name, price, status, category }) => {
  const filters = {
    PageNumber: page || 1,
    Name: name || null,
    // PriceOrder: price || null,
    // Status: status || null,
    // CategoryID: category || null,
  };
  const filteredParam = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null)
  );

  const res = await fetch(
    `${process.env.API_SECRET_URL}/api/v1/products?` +
      new URLSearchParams(filteredParam)
  );

  return res.json();
};

export const postProduct = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/products`;

  const res = await fetch(url, {
    body: data,
    method: "POST",
  });

  return res.json();
};
