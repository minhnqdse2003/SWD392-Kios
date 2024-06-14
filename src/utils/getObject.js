import { sidebarItems } from "@/components/Sidebar";

export const objectToFormData = (obj) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

export const getSidebarItemByPath = (path) => {
  const regex = new RegExp(`^${path}$`); // Create a regular expression for the path
  return sidebarItems.find((item) => regex.test(item.href));
};

export const getSearchParamsObject = (searchParams) =>
  Object.fromEntries(searchParams);

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
