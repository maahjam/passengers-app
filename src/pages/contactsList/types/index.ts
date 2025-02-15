import { ContactType } from "@type/contact";
export interface PaginatedContactsList {
    items: ContactType[];
    pager: {
        limit: number;
        skip: number;
        totalPages: number;
    };
}

export interface QueryParams {
    query?: string;
    limit?: number;
    skip: number;
}

export interface QueryPageState {
    currentPage: number;
    query: string;
}

export interface State {
    contacts: ContactType[];
}

interface Actions {
    setContacts: (contacts: ContactType[]) => void;
}

export type Store = State & Actions;
