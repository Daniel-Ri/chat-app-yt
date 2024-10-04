import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConversationUser, GetConversationsResponse } from "../types/types";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationUser[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data: GetConversationsResponse = await res.json();
        if ("error" in data) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
