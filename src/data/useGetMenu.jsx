import { getMenu } from "@/server/menuAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMenu = (filters) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getMenu(filters),
    queryKey: ["menu", filters],
  });
};

export const usePostMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postMenu(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", ]);
    },
    onError: () => {
      queryClient.invalidateQueries(["menu", ]);
    },
  });
};
