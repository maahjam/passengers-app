import { create } from "zustand";

import { ContactType } from "@type/contact";
import { State, Store } from "@pages/contactsList/types";

const initialState: State = {
  contacts: [],
  recentVisited: {},
  recentVisitedQueue: [],
};

const useStore = create<Store>((set) => ({
  ...initialState,
  setContacts: (contacts) =>
    set((state) => ({
      ...state,
      contacts,
    })),
  setRecentVisited: (contact) =>
    set((state) => {
      if (state.recentVisitedQueue.length >= 4) {
        const newQueue = [...state.recentVisitedQueue, contact];
        const deleted = newQueue.shift();

        const newRecent = { ...state.recentVisited, [contact.id]: contact };
        delete newRecent[(deleted as ContactType).id];

        return {
          ...state,
          recentVisited: newRecent,
          recentVisitedQueue: newQueue,
        };
      }

      return {
        ...state,
        recentVisitedQueue: [...state.recentVisitedQueue, contact],
        recentVisited: { ...state.recentVisited, [contact.id]: contact },
      };
    }),
  updateRecentVisitedQueue: (contact) =>
    set((state) => {
      const newQueue = state.recentVisitedQueue.filter(
        (item) => item.id !== contact.id,
      );
      newQueue.push(contact);

      return {
        ...state,
        recentVisitedQueue: newQueue,
      };
    }),
}));

export default useStore;
