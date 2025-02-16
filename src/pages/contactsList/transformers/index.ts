import defaultAvatar from "@assets/defaultAvatar.jpg";
import { PaginatedContactsList, QueryParams } from "../types";

export const buildContactQueryParams = (
  queryParams: QueryParams,
): URLSearchParams => {
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

  return new URLSearchParams({
    ...(query && { where: JSON.stringify(whereClause) }),
    sort: "createdAt DESC",
    limit: limit.toString(),
    skip: skip.toString(),
  });
};

export const getContactListTransformer = (data): PaginatedContactsList => {
  return {
    items: data.items.map((item) => ({
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      gender: item.gender,
      phone: item.phone,
      note: item.note,
      telegram: item.telegram,
      avatar: item.avatar || defaultAvatar,
      company: item.company,
      address: item.address || "Silicon valley",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    pager: {
      limit: data.meta.limit,
      skip: data.meta.skipped,
      totalPages: data.meta.total,
    },
  };
};
