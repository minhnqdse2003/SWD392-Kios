import Link from "next/link";

const handleFilterAction = (page, filters) => {
  const filteredParam = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null)
  );

  return { ...filteredParam, page: page };
};

export function PaginationController({
  totalContent = 1,
  pageSize = 10,
  filterParams,
}) {
  const totalPages = Math.ceil(totalContent / pageSize);
  const { page: currentPage } = filterParams;

  function isInvalidPageNumber(page) {
    if (isNaN(page)) {
      return 1;
    }

    if (Number(page) < 1) return 1;

    return page;
  }

  function isValidNext() {
    return isInvalidPageNumber(currentPage) === totalPages;
  }

  function isValidPrev() {
    return isInvalidPageNumber(currentPage) === 1;
  }

  console.log(isInvalidPageNumber(currentPage) === totalPages);

  return (
    <div className="flex justify-end mt-4">
      <Link
        className={`${
          isValidPrev ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        } mr-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        href={`?${new URLSearchParams(
          handleFilterAction(Number(currentPage) - 1, filterParams)
        )}`}
      >
        Previous
      </Link>
      <span className="px-2 py-1 text-gray-700">
        Page {isInvalidPageNumber(currentPage)} of {totalPages}
      </span>
      <Link
        className={`${
          isValidNext ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        } mr-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        href={`?${new URLSearchParams(
          handleFilterAction(Number(currentPage) + 1, filterParams)
        )}`}
      >
        Next
      </Link>
    </div>
  );
}
