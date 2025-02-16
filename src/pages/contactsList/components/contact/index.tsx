import React from "react";
import { useNavigate } from "react-router";

import { ContactType } from "@type/contact";
import useStore from "@pages/contactsList/store";

interface Props {
  contact: ContactType;
}

export const Contact: React.FC<Props> = ({ contact }) => {
  const navigate = useNavigate();
  const { setRecentVisited } = useStore((state) => state);

  const handleContactClick = () => {
    navigate(`/contacts/${contact.id}`);
    setRecentVisited(contact);
  };

  return (
    <div
      className="flex flex-col justify-between items-center shadow-md bg-green-200 rounded-md mb-4 cursor-pointer"
      onClick={handleContactClick}
    >
      <div className="flex justify-center w-52 h-52 items-center border-4 border-green-600 rounded-full mt-2">
        <img
          className="object-cover rounded-full"
          src={contact.avatar}
          alt="contact"
        />
      </div>
      <p className="font-bold text-2xl text-zinc-600 w-full text-center py-4">
        {contact.firstName} {contact.lastName}
      </p>
      <div className="bg-green-400 w-full p-4 rounded-b-md text-center text-zinc-600 font-medium">
        <p className="mb-2">{contact.phone}</p>
        <p>{contact.address}</p>
      </div>
    </div>
  );
};
