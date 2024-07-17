import { deleteMenuProduct, getAllMenu, getMenu, postMenuProduct } from "@/server/menuAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMenu = (filters) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getMenu(filters),
    queryKey: ["menu", filters],
  });
};

export const useGetAllMenu = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getAllMenu(),
    queryKey: "allmenu",
  });
};

export const usePostMenuProduct = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postMenuProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["menu"]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["menu"]);
    },
  });
};

export const useDeleteMenuProduct = (onClose, filters) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await deleteMenuProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", filters]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["menu", filters]);
    },
  });
}
