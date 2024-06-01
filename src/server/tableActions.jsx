"use server";

export const getTable = async () => {
  try {
    const data = await fetch(
      "https://665748b19f970b3b36c8af61.mockapi.io/api/table",
      {
        method: "GET",
      }
    );
    return data.json();
  } catch (error) {
    return { error: error };
  }
};
