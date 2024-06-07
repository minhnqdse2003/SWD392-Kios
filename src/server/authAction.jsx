"use server";

import { revalidatePath } from "next/cache";

export const getUser = async (data) => {
  try {
    const response = await fetch(`http:localhost:3000/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    return { error: error };
  }
};
