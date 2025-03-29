import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "primary" | "secondary";
}

export function Loader({
  size = "default",
  variant = "default",
  className,
  ...props
}: LoaderProps) {
  const sizeClasses = {
    sm: "size-4",
    default: "size-8",
    lg: "size-12",
  };

  const variantClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2Icon
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant],
        )}
      />
    </div>
  );
}
