import { create } from "zustand";
import { State, Store } from "../types";

const initialState: State = {
  contacts: [],
};

const useStore = create<Store>((set) => ({
  ...initialState,
  setContacts: (contacts) =>
    set((state) => ({
      ...state,
      contacts,
    })),
}));

export default useStore;
