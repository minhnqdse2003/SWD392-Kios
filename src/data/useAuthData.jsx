import { getUser } from "@/server/authAction";
import { useQuery } from "@tanstack/react-query";

export const useLogin = (data) => {
  return useQuery({
    queryFn: async () => getUser(data),
    queryKey: ["login", data],
  });
};
