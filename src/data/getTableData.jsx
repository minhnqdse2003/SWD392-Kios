import { getTable } from "@/server/tableActions";
import { useQuery } from "@tanstack/react-query";

export const useGetTable = () => {
  return useQuery({
    queryFn: async () => getTable(),
    queryKey: ["table"],
  });
};
