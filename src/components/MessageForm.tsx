import { actions } from "astro:actions";
// import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "../../server/db";
import { useState } from "react";

export const MessageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="p-6 rounded-lg border border-surface-0 shadow-lg w-full max-w-lg bg-base/80 backdrop-blur-xl"
      method="POST"
      action={"/" + actions.setGreeting}
      onSubmit={async (e) => {
        console.log("SUBMITTING");
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const res = await actions.setGreeting(formData);
        console.log("RES", res);

        if (res.error) {
          setError(res.error.message);
        }

        setIsSubmitting(false);
      }}
    >
      <div className="mb-4">
        <input
          type="text"
          name="message"
          maxLength={20}
          className="w-full bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal"
          placeholder="your message (max 20 chars)"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="author"
          maxLength={10}
          className="w-full bg-surface-0 p-2 border border-surface-1 rounded focus:outline-none focus:border-teal"
          placeholder="your name (max 10 chars)"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-pink text-base px-4 py-2 rounded w-full transition-colors focus:outline-none focus-visible:bg-teal disabled:opacity-50 ${
          !isSubmitting ? "hover:bg-peach hover:bg-rose" : ""
        }`}
      >
        Send Message
      </button>

      {error && <div className="text-rose-500 text-center mt-4">{error}</div>}
    </form>
  );
};
