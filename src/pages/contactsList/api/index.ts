import axiosInstance from "@services/axios";
import { PaginatedContactsList, QueryParams } from "@pages/contactsList/types";
import {
  buildContactQueryParams,
  getContactListTransformer,
} from "@pages/contactsList/transformers";

export const fetchContacts = async (
  queryParams: QueryParams,
): Promise<PaginatedContactsList> => {
  const params = buildContactQueryParams(queryParams);
  const url = `passenger/?${params.toString()}`;

  try {
    const response = await axiosInstance.get(url);
    return getContactListTransformer(response.data);
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};
