"use server";

export const getUser = async (credentials) => {
  const { email, password } = credentials;
  try {
    const response = await fetch(
      `${process.env.API_SECRET_URL}/api/v1/users/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    return { error: error };
  }
};

export const getUserWithGoogle = async (email) => {
  try {
    const response = await fetch(
      `${process.env.API_SECRET_URL}/api/v1/users/login-with-google`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    return { error: error };
  }
};
