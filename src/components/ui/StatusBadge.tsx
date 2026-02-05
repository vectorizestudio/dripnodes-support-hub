import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type TicketStatus = "open" | "answered" | "waiting" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "status-open" },
  answered: { label: "Answered", className: "status-answered" },
  waiting: { label: "Waiting", className: "status-waiting" },
  closed: { label: "Closed", className: "status-closed" },
};

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "priority-low" },
  medium: { label: "Medium", className: "priority-medium" },
  high: { label: "High", className: "priority-high" },
  urgent: { label: "Urgent", className: "priority-urgent" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("border", config.className, className)}>
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <Badge variant="secondary" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}