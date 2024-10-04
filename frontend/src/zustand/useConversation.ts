import { create } from "zustand";
import { ConversationUser } from "../types/types";

// Define the shape of the conversation state
interface ConversationState {
  selectedConversation: ConversationUser | null; // Change as per your logic
  setSelectedConversation: (
    selectedConversation: ConversationUser | null
  ) => void;
  messages: any[]; // Replace `any` with a more specific type if possible
  setMessages: (messages: any[]) => void; // Replace `any` with a more specific type if possible
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
