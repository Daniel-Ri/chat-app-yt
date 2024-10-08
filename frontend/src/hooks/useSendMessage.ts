import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { SendMessageResponse } from "../types/types";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation!._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data: SendMessageResponse = await res.json();
      if ("error" in data) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
