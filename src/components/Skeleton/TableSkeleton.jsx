import { Skeleton } from "@nextui-org/react";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col justify-between rounded-sm border bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      {[...Array(5)].map((_, index) => (
        <div>
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
