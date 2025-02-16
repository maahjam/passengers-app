import axiosInstance from "@services/axios";
import { ContactType } from "@type/contact";
import { getContactDetailTransformer } from "@pages/contactDetails/transformers";

export const fetchContactDetail = async (id: string): Promise<ContactType> => {
  const url = `passenger/${id}`;
  try {
    const response = await axiosInstance.get(url);
    return getContactDetailTransformer(response.data);
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};
