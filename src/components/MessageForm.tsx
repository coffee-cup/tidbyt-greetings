import { actions } from "astro:actions";
// import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "../../server/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorMessage } from "../hooks/useErrorMessage";
import { useMessages, type Message } from "../hooks/useMessages";
import { cn } from "../styles";
import { useCurrentTime } from "../hooks/useCurrentTime";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useRef } from "react";

dayjs.extend(duration);

const formatTimeRemaining = ({
  now,
  displayedUntil,
}: {
  now: Date;
  displayedUntil: Date;
}) => {
  const duration = dayjs.duration(dayjs(displayedUntil).diff(dayjs(now)));
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  if (duration.asSeconds() <= 10) return `${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

export const MessageForm = () => {
  const { currentMessage } = useMessages();
  const [error, setError] = useErrorMessage();

  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: setGreeting, isPending } = useMutation({
    mutationFn: (data: FormData) => actions.setGreeting.orThrow(data),
    onSuccess: ({ greeting }) => {
      queryClient.setQueryData(["messages"], (old: Message[]) => [
        ...old,
        greeting,
      ]);

      // Clear form values
      formRef.current?.reset();
    },
    onError: (error) => setError(error.message),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const isDisabled = currentMessage != null;
  const currentTime = useCurrentTime(1);

  const remainingTimeString = formatTimeRemaining({
    now: currentTime,
    displayedUntil: dayjs(currentMessage?.displayedUntil).toDate(),
  });

  return (
    <form
      ref={formRef}
      className={cn(
        "relative p-4 md:p-6 rounded-lg border border-teal/20 shadow-lg w-full max-w-lg bg-base/80 backdrop-blur-xl",
        isDisabled && "select-none",
      )}
      method="POST"
      action={"/" + actions.setGreeting}
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        setGreeting(formData);
      }}
    >
      {isDisabled && (
        <div className="absolute z-[999999] inset-0 bg-mantle/80 rounded-lg backdrop-blur-sm flex gap-2 flex-col items-center justify-center">
          <p className="text-center text-sm text-teal">
            There is already a message being displayed.
          </p>

          <p className="text-center text-sm text-teal mb-4">
            You can send a new message in{" "}
            <span className="text-peach tabular-nums">
              {remainingTimeString}
            </span>
            .
          </p>
        </div>
      )}

      <input
        type="text"
        name="message"
        maxLength={20}
        disabled={isDisabled}
        className="w-full mb-4 bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal disabled:opacity-50"
        placeholder="your message (max 20 chars)"
        required
      />

      <input
        type="text"
        name="author"
        maxLength={10}
        disabled={isDisabled}
        className="w-full mb-4 bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal disabled:opacity-50"
        placeholder="your name (max 10 chars)"
        required
      />

      <button
        type="submit"
        disabled={isDisabled || isPending}
        className={cn(
          "bg-pink text-base px-4 py-2 rounded w-full transition-colors focus:outline-none focus-visible:bg-teal disabled:opacity-50",
          !isDisabled ? "hover:bg-teal" : "bg-pink/10 cursor-not-allowed",
        )}
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>

      {error && <div className="text-rose-500 text-center mt-4">{error}</div>}
    </form>
  );
};
