const { authOptions } = require("@/utils/authOptions");
const { getServerSession } = require("next-auth");

export const fetchBase = async (url, options = {}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const defaultHeaders = {
    Authorization: `Bearer ${session.user.accessToken}`,
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};
