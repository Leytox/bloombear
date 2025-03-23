import FlowerCardSkeleton from "./FlowerCardSceleton";

export default function LoadingIndicator() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(9)].map((_, index) => (
        <FlowerCardSkeleton key={index} />
      ))}
    </div>
  );
}
