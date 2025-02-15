import { useEffect } from "react";

import { fetchContacts } from "./api";
import { Contact } from "./components/contact";
import useStore from "./store";

import Loading from "@components/loading";
import NotFound from "@components/notFound";
import ErrorMessage from "@components/error";
import { ContactType } from "@type/contact";
import { useQuery } from "react-query";

const ContactList: React.FC = () => {
    const { setContacts, contacts } = useStore((state) => state);

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: () => fetchContacts(),
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data?.items) setContacts(data?.items as ContactType[]);
    }, [data?.items]);

    const hasContact = contacts.length;

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage errorMessage={error.message} />;

    return (
        <>
            {hasContact ? (
                <div className="mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {contacts.map((contact) => (
                            <Contact key={contact.id} contact={contact} />
                        ))}
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default ContactList;
