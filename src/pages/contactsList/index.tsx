import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import Pagination from "@components/pagination";
import Search from "@components/search";
import Loading from "@components/loading";
import NotFound from "@components/notFound";
import ErrorMessage from "@components/error";
import useDebounce from "@hooks/useDebounce";
import { ContactType } from "@type/contact";

import { fetchContacts } from "./api";
import { Contact } from "./components/contact";
import useStore from "./store";
import { RecentVisited } from "./components/recentVisited";
import { PaginatedContactsList } from "./types";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_QUERY_VALUE = "";

const ContactsList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { setContacts, contacts, recentVisited, recentVisitedQueue } = useStore(
        (state) => state,
    );

    const currentPage = parseInt(
        searchParams.get("page") || DEFAULT_PAGE_NUMBER.toString(),
        10,
    );
    const query = searchParams.get("query") || DEFAULT_QUERY_VALUE;

    const debouncedQuery = useDebounce(query, 500);

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: () => fetchContacts({ skip: currentPage, query }),
    });

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString(), ...(query && { query }) });
    };

    const handleSearch = (newQuery: string) => {
        setSearchParams({ page: DEFAULT_PAGE_NUMBER.toString(), query: newQuery });
    };

    const handleClearSearch = () => {
        setSearchParams({ page: DEFAULT_PAGE_NUMBER.toString() });
    };

    useEffect(() => {
        if (data?.items) setContacts(data.items as ContactType[]);
    }, [data?.items]);

    useEffect(() => {
        refetch();
    }, [currentPage, debouncedQuery]);

    const hasContact = contacts.length;
    const hasVisitedContacts = recentVisitedQueue.length > 0;

    if (isLoading) return <Loading />;
    if (error instanceof Error)
        return <ErrorMessage errorMessage={error.message} />;

    return (
        <>
            <Search
                query={query}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
            />

            {hasVisitedContacts && (
                <div className="mx-auto p-4 mb-5">
                    <p className="text-zinc-600 font-bold text-xl my-4">
                        Recent visited contacts
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recentVisitedQueue.map((contact) => (
                            <RecentVisited key={contact.id} contact={contact} />
                        ))}
                    </div>
                    <div className="border mx-4"></div>
                </div>
            )}

            {hasContact ? (
                <div className="mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {contacts
                            .filter((item) => !(item.id in recentVisited))
                            .map((contact) => (
                                <Contact key={contact.id} contact={contact} />
                            ))}
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
            <Pagination
                totalPages={(data as PaginatedContactsList)?.pager.totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default ContactsList;
