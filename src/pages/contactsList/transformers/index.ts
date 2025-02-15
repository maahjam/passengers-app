import defaultAvatar from "@assets/defaultAvatar.jpg";
import { PaginatedContactsList } from "../types";

const getContactListTransformer = (data: any): PaginatedContactsList => {
  return {
    items: data.items.map((item: any) => ({
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
  };
};

export { getContactListTransformer };
