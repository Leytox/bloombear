import { Loader } from "@/components/Loader";

export default function FullPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader size="lg" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
