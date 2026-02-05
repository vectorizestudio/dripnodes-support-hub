import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter,
  ArrowRight,
  Ticket as TicketIcon
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, PriorityBadge, TicketStatus } from "@/components/ui/StatusBadge";
import { mockTickets } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const statusFilters: { value: TicketStatus | "all"; label: string }[] = [
  { value: "all", label: "All Tickets" },
  { value: "open", label: "Open" },
  { value: "answered", label: "Answered" },
  { value: "waiting", label: "Waiting" },
  { value: "closed", label: "Closed" },
];

export default function TicketList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground">
              View and manage all your support tickets
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" asChild>
            <Link to="/tickets/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Ticket
            </Link>
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {statusFilters.map((filter) => (
              <Button
                key={filter.value}
                variant="ghost"
                size="sm"
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  "whitespace-nowrap",
                  statusFilter === filter.value && "bg-primary/10 text-primary"
                )}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Ticket List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="divide-y divide-border/50">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="block p-5 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            {ticket.id}
                          </span>
                          <StatusBadge status={ticket.status} />
                          <PriorityBadge priority={ticket.priority} />
                        </div>
                        <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                          {ticket.subject}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                          </div>
                          <div className="text-xs text-muted-foreground/60">
                            {ticket.messages.length} messages
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="p-12 text-center">
                <TicketIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No tickets found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search or filters."
                    : "Create your first ticket to get help from our team."}
                </p>
                <Button asChild>
                  <Link to="/tickets/new">Create Ticket</Link>
                </Button>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </Layout>
  );
}