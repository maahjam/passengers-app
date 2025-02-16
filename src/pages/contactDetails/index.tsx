import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchContactDetail } from "./api";
import Loading from "@components/loading";
import ErrorMessage from "@components/error";

const ContactDetails: React.FC = () => {
  const { contactId } = useParams();

  const {
    data: contact,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contactDetail"],
    queryFn: () => fetchContactDetail(contactId as string),
  });

  useEffect(() => {
    refetch();
  }, [contactId]);

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return <ErrorMessage errorMessage={error.message} />;

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <section className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
        <div className="flex flex-col justify-between items-center bg-green-200 w-full max-w-lg shadow-md rounded-md p-6">
          <div className="flex flex-col items-center w-full bg-green-400 p-4 rounded-md">
            <div className="w-40 h-40 md:w-52 md:h-52 border-4 border-green-600 rounded-full overflow-hidden">
              <img
                className="object-cover rounded-full w-full h-full"
                src={contact?.avatar}
                alt="contact"
              />
            </div>
            <p className="text-zinc-600 font-medium mt-4">
              Telegram ID: {contact?.telegram}
            </p>
          </div>

          <div className="flex flex-col w-full justify-around p-4 gap-6">
            <p className="font-bold text-xl md:text-2xl text-zinc-600 text-center">
              {contact?.firstName} {contact?.lastName}
            </p>
            <p className="text-center text-md font-medium text-zinc-600">
              {contact?.note}
            </p>
            <div className="flex flex-col items-center gap-2 text-md font-medium text-zinc-600">
              <p>Phone: {contact?.phone}</p>
              <p>Company: {contact?.company}</p>
              <p>Email: {contact?.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactDetails;
