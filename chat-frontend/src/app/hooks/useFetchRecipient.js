import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/service";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chat || !user?._id || !Array.isArray(chat.menbers)) return;

    const recipientId = chat.menbers.find((id) => id !== user._id);
    if (!recipientId) return;

    const getUser = async () => {
      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
      console.log("response: ", response);
      if (response.error) {
        setError(response);
      } else {
        setRecipientUser(response);
      }
    };

    getUser();
  }, [chat, user]);

  return { recipientUser, error };
};
