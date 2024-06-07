import { getTable } from "@/server/tableActions";
import { useQuery } from "@tanstack/react-query";

export const useGetTable = (filterParams) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getTable(filterParams),
    queryKey: ["table", filterParams],
  });
};
