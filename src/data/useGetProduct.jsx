import { getProduct, postProduct } from "@/server/productAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProduct = (filterParams) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getProduct(filterParams),
    queryKey: ["table", filterParams],
  });
};

export const usePostProduct = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["table", filterParams]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["table", filterParams]);
      onClose();
    },
  });
};
