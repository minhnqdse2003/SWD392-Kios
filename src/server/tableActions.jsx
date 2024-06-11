"use server";

export const getTable = async ({ page, filteredBy, ascOrder }) => {
  const data = await fetch(
    `https://665748b19f970b3b36c8af61.mockapi.io/api/table`,
    {
      method: "GET",
    }
  );

  if (!data.ok) {
    throw new Error("Network response was not ok");
  }

  return data.json();
};
