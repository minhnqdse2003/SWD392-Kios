import { getOrder, putOrderStatus } from "@/server/orderAction";
import { isEmptyObject } from "@/utils/getObject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrder = (searchParams) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getOrder(),
    queryKey: isEmptyObject(searchParams) ? ["order"] : ["order", searchParams],
  });
};

export const usePostOrderStatus = (searchParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await putOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["order", searchParams]);
    },
  });
};
