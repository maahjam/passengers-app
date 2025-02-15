import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchContacts } from "./api";
import { Contact } from "./components/contact";
import useStore from "./store";
import { PaginatedContactsList, QueryPageState } from "./types";

import Pagination from "@components/pagination";
import Search from "@components/search";
import Loading from "@components/loading";
import NotFound from "@components/notFound";
import ErrorMessage from "@components/error";
import { ContactType } from "@type/contact";
import useDebounce from "@hooks/useDebounce";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_QUERY_VALUE = "";

const ContactsList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialState = {
        currentPage: parseInt(
            searchParams.get("page") || DEFAULT_PAGE_NUMBER.toString(),
            10,
        ),
        query: searchParams.get("query") || DEFAULT_QUERY_VALUE,
    };

    const [pageQueryState, setPageQueryState] =
        useState<QueryPageState>(initialState);

    const debouncedValue = useDebounce(pageQueryState.query, 500);

    const { setContacts, contacts } = useStore((state) => state);

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: () =>
            fetchContacts({
                skip: pageQueryState.currentPage,
                query: pageQueryState.query,
            }),
    });

    const handlePageChange = (page: number) => {
        setPageQueryState((prevState) => ({
            ...prevState,
            currentPage: page,
        }));
        setSearchParams({
            page: page.toString(),
            ...(pageQueryState.query && { query: pageQueryState.query }),
        });
    };

    const handleSearch = (newQuery: string) => {
        setPageQueryState({ query: newQuery, currentPage: DEFAULT_PAGE_NUMBER });
        setSearchParams({ page: DEFAULT_PAGE_NUMBER.toString(), query: newQuery });
    };

    const handleClearSearch = () => {
        setPageQueryState({
            query: DEFAULT_QUERY_VALUE,
            currentPage: DEFAULT_PAGE_NUMBER,
        });
        setSearchParams({ page: DEFAULT_PAGE_NUMBER.toString() });
    };

    useEffect(() => {
        if (data?.items) setContacts(data?.items as ContactType[]);
    }, [data?.items]);

    useEffect(() => {
        refetch();
    }, [pageQueryState.currentPage, debouncedValue]);

    const hasContact = contacts.length;

    if (isLoading) return <Loading />;
    if (error instanceof Error)
        return <ErrorMessage errorMessage={error.message} />;

    return (
        <>
            <Search
                query={pageQueryState.query}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
            />
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
            <Pagination
                totalPages={(data as PaginatedContactsList)?.pager.totalPages}
                currentPage={pageQueryState.currentPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default ContactsList;
