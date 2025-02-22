export interface YouTubeHeroProps {
  className?: string;
}

export function YouTubeHero(props: YouTubeHeroProps) {
  const { className = "" } = props;

  return (
    <div className={className}>
      <h1 className="text-4xl font-bold sm:text-6xl ">
        <span className="block text-gray-300">Introducing</span>
        <span className="block text-red-600">YouTube</span>
        <span className="block">Time Capsule</span>
      </h1>
      <p className="mt-3 mb-6 text-gray-400 sm:text-xl">
        Drop your YouTube URL below and watch the magic happen
      </p>
    </div>
  );
}
