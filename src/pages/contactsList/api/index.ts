import axiosInstance from "@services/axios";

import { PaginatedContactsList, QueryParams } from "../types";
import { getContactListTransformer } from "../transformers";

export const fetchContacts = async (
  queryParams: QueryParams,
): Promise<PaginatedContactsList> => {
  const { query, limit = 10, skip } = queryParams;

  let firstName = "";
  let lastName = "";
  let phone = "";

  if (query) {
    const trimmedQuery = query.trim();
    if (/^\d+[\d\s]*\d+$/.test(trimmedQuery)) {
      phone = trimmedQuery;
    } else if (trimmedQuery.includes(" ")) {
      const [first, ...last] = trimmedQuery.split(" ");

      firstName = first;
      lastName = last.join("");
    } else {
      firstName = trimmedQuery;
    }
  }

  const whereClause = {
    ...(firstName && { first_name: { contains: firstName } }),
    ...(lastName && { last_name: { contains: lastName } }),
    ...(phone && { phone: { contains: phone } }),
  };

  const params = new URLSearchParams({
    ...(query && { where: JSON.stringify(whereClause) }),
    sort: "createdAt DESC",
    limit: limit.toString(),
    skip: skip.toString(),
  });

  const url = `passenger/?${params.toString()}`;

  try {
    const response = await axiosInstance.get(url);
    return getContactListTransformer(response.data);
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};
