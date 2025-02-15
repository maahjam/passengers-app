import { ContactType } from "@type/contact";
export interface PaginatedContactsList {
    items: ContactType[];
}

export interface State {
    contacts: ContactType[];
}

interface Actions {
    setContacts: (contacts: ContactType[]) => void;
}

export type Store = State & Actions;
