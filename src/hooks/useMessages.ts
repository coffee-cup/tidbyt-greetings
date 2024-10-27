import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../constants";

export type Message = {
  id: number;
  message: string;
  author: string;
  createdAt: string;
  displayedUntil: string;
  video: string;
};

export const getMessages = async () => {
  const res = await fetch(`${apiUrl}/greetings`);
  const data = await res.json();
  return data as Message[];
};

export const useMessages = () => {
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const messages = data ?? [];

  const currentMessage = messages.find(
    (message) => message.displayedUntil > new Date().toISOString(),
  );

  const pastMessages = messages.filter(
    (message) => message.id !== currentMessage?.id,
  );

  return { currentMessage, pastMessages };
};
