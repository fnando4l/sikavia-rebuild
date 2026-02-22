import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <h3 className="font-display text-2xl text-charcoal">{title}</h3>
      {description && (
        <p className="mt-2 font-body text-sm text-muted max-w-sm">{description}</p>
      )}
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button variant="primary">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
