import Link from "next/link";

export function PaginationController({ totalContent, pageSize, filterParams }) {
  const totalPages = Math.ceil(totalContent / pageSize);
  const { page: currentPage } = filterParams;

  return (
    <div className="flex justify-end mt-4">
      <Link
        className={`${
          Number(currentPage) === 1
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
        } mr-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        href={`?${new URLSearchParams({
          ...filterParams,
          page: Number(currentPage) - 1,
        })}`}
        disabled={Number(currentPage) === 1}
      >
        Previous
      </Link>
      <span className="px-2 py-1 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        className={`${
          Number(currentPage) === totalPages
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
        } mr-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        href={`?${new URLSearchParams({
          ...filterParams,
          page: Number(currentPage) + 1,
        })}`}
      >
        Next
      </Link>
    </div>
  );
}
