import { useMessages, type Message } from "../hooks/useMessages";
import { TimeDisplayed } from "./TimeDisplayed";
import { Video } from "./Video";

export const MessageList = () => {
  const { currentMessage, pastMessages } = useMessages();

  return (
    <div className="w-full flex flex-col items-center">
      {currentMessage && (
        <div className="mt-12 w-full max-w-lg">
          <h2
            className="text-sapphire text-xl font-medium mb-4"
            style={{
              textShadow:
                "0 0 10px rgba(203, 166, 247, 0.7), 0 0 20px rgba(203, 166, 247, 0.5)",
            }}
          >
            Current message
          </h2>

          <div className="flex items-center justify-between gap-2 bg-surface-0/80 backdrop-blur-xl p-4 rounded-lg">
            <div>
              <p className="text-text">{currentMessage.message}</p>
              <p className="text-foam text-sm mt-1">
                - {currentMessage.author}
              </p>
              <p className="text-subtext-0/80 text-xs mt-2">
                Displayed for{" "}
                <TimeDisplayed time={currentMessage.displayedUntil} />
              </p>
            </div>

            <Video video={currentMessage.video} />
          </div>
        </div>
      )}

      {pastMessages.length > 0 && (
        <div className="mt-12 w-full max-w-lg">
          <h2
            className="text-subtle text-xl font-medium mb-4"
            style={{
              textShadow:
                "0 0 10px rgba(203, 166, 247, 0.7), 0 0 20px rgba(203, 166, 247, 0.5)",
            }}
          >
            Past messages
          </h2>

          <ul className="space-y-4">
            {pastMessages.map(({ id, message, author, video }) => (
              <li
                key={id}
                className="flex items-center justify-between gap-2 bg-surface-0/80 backdrop-blur-xl p-4 rounded-lg"
              >
                <div>
                  <p className="text-text">{message}</p>
                  <p className="text-foam text-sm mt-1">- {author}</p>
                </div>

                <Video video={video} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
