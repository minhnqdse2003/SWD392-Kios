import {
  deleteProduct,
  getAllProducts,
  getProduct,
  postProduct,
  updateProduct,
} from "@/server/productAction";
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

export const useDeleteProduct = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await deleteProduct(id),
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

export const useUpdateProduct = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => await updateProduct(formData),
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

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => getAllProducts(),  
    refetchOnWindowFocus: false,
  });
};
