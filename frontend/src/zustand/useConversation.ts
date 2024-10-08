import { create } from "zustand";
import { ConversationUser, Message } from "../types/types";

// Define the shape of the conversation state
interface ConversationState {
  selectedConversation: ConversationUser | null; // Change as per your logic
  setSelectedConversation: (
    selectedConversation: ConversationUser | null
  ) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
