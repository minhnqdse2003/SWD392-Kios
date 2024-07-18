import {
  deleteBusiness,
  getBusiness,
  getBusinessDashboard,
  postUser,
  updateBusiness,
} from "@/server/userAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBusiness = (filterParams) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getBusiness(filterParams),
    queryKey: ["business", filterParams],
  });
};

export const usePostBusiness = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["business", filterParams]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["business", filterParams]);
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

export const useGetBusinessDashBoard = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getBusinessDashboard(),
    queryKey: ["business-dashboard"],
  });
};

export const useDeleteBusiness = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["business", filterParams]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["business", filterParams]);
    },
  });
};

export const useUpdateBusiness = (onClose, filterParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => await updateBusiness(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["business", filterParams]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["business", filterParams]);
    },
  });
};
