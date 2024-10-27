import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { useState } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";

export const MessageData = ({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <MessageForm />
        <MessageList />
      </HydrationBoundary>
    </QueryClientProvider>
  );
};
