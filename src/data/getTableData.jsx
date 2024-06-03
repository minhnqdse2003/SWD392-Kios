import { getTable } from "@/server/tableActions";
import { useQuery } from "@tanstack/react-query";

export const useGetTable = (filterParams) => {
  return useQuery({
    queryFn: async () => getTable(filterParams),
    queryKey: ["table", filterParams],
  });
};
