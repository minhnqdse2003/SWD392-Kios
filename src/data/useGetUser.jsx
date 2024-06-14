import { getBusiness, postUser } from "@/server/userAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBusiness = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getBusiness(),
    queryKey: ["business"],
  });
};

export const usePostBusiness = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["business"]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["business"]);
    },
  });
};

export const usePostStaff = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["business"]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["business"]);
    },
  });
};
