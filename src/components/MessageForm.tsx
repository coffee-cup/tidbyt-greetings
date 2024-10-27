import { actions } from "astro:actions";
// import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "../../server/db";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { useErrorMessage } from "../hooks/useErrorMessage";
import { useMessages, type Message } from "../hooks/useMessages";
import { cn } from "../styles";
import { useQueryClient } from "@tanstack/react-query";

export const MessageForm = () => {
  const { currentMessage } = useMessages();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useErrorMessage();

  const queryClient = useQueryClient();

  const isDisabled = isSubmitting || currentMessage != null;

  return (
    <form
      className="relative p-4 md:p-6 rounded-lg border border-surface-0 shadow-lg w-full max-w-lg bg-base/80 backdrop-blur-xl"
      method="POST"
      action={"/" + actions.setGreeting}
      onSubmit={async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const res = await actions.setGreeting(formData);

        if (res.error) {
          setError(res.error.message);
        }

        setIsSubmitting(false);
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      }}
    >
      {isDisabled && (
        <div className="absolute inset-0 bg-mantle/80 rounded-lg backdrop-blur-sm flex items-center justify-center">
          <p className="text-center text-base text-subtext-1 mb-8">
            Only one message can be displayed at a time.
          </p>
        </div>
      )}

      <input
        type="text"
        name="message"
        maxLength={20}
        disabled={isDisabled}
        className="w-full mb-4 bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal"
        placeholder="your message (max 20 chars)"
        required
      />

      <input
        type="text"
        name="author"
        maxLength={10}
        disabled={isDisabled}
        className="w-full mb-4 bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal"
        placeholder="your name (max 10 chars)"
        required
      />

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          "bg-pink text-base px-4 py-2 rounded w-full transition-colors focus:outline-none focus-visible:bg-teal disabled:opacity-50",
          !isDisabled
            ? "hover:bg-peach hover:bg-rose"
            : "bg-pink/10 cursor-not-allowed",
        )}
      >
        Send Message
      </button>

      {error && <div className="text-rose-500 text-center mt-4">{error}</div>}
    </form>
  );
};
