export const Video = ({ video }: { video: string }) => {
  return (
    <img
      src={`data:image/webp;base64,${video}`}
      alt="Animated greeting"
      className="w-[128px] h-[64px] rounded-sm"
    />
  );
};
