import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../constants";
import { useCurrentTime } from "./useCurrentTime";
import { useMemo } from "react";

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

  const currentTime = useCurrentTime();

  const currentMessage = useMemo(
    () => messages.find((message) => message.displayedUntil > currentTime),
    [messages, currentTime],
  );

  const pastMessages = useMemo(
    () => messages.filter((message) => message.id !== currentMessage?.id),
    [messages, currentMessage],
  );

  return { currentMessage, pastMessages };
};
