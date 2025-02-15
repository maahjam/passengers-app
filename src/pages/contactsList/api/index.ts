import axiosInstance from "@services/axios";

import { getContactListTransformer } from "../transformers";

export const fetchContacts = async () => {
  const url = `passenger/`;

  try {
    const response = await axiosInstance.get(url);
    return getContactListTransformer(response.data);
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};
