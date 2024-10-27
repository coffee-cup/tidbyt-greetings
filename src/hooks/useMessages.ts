import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../constants";
import { queryClient } from "../stores/query";

export type Message = {
  id: number;
  message: string;
  author: string;
  createdAt: string;
  displayedUntil: string;
  video: string;
};

export const useMessages = (initialMessages?: Message[]) => {
  const client = useStore(queryClient);
  const { data } = useQuery(
    {
      queryKey: ["messages"],
      queryFn: async () => {
        const res = await fetch(`${apiUrl}/greetings`);
        const data = await res.json();
        return data as Message[];
      },
      initialData: initialMessages,
      refetchInterval: 1000,
      refetchOnWindowFocus: true,
    },
    client,
  );

  const messages = data ?? [];

  const currentMessage = messages.find(
    (message) => message.displayedUntil > new Date().toISOString(),
  );

  const pastMessages = messages.filter(
    (message) => message.id !== currentMessage?.id,
  );

  return { currentMessage, pastMessages };
};
