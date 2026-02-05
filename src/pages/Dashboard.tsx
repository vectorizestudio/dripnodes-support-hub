import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Ticket, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Settings,
  Filter
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/ui/StatusBadge";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { mockTickets, mockStats } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const statCards = [
  {
    label: "Open Tickets",
    value: mockStats.openTickets,
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Resolved Today",
    value: mockStats.resolvedToday,
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Avg Response",
    value: mockStats.avgResponseTime,
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
    isText: true,
  },
  {
    label: "Satisfaction",
    value: mockStats.satisfaction,
    icon: Ticket,
    color: "text-primary",
    bgColor: "bg-primary/10",
    suffix: "%",
  },
];

export default function Dashboard() {
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
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your support tickets.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
              <Link to="/tickets/new" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Ticket
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="p-5" hover={false}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {stat.isText ? (
                    stat.value
                  ) : (
                    <>
                      <AnimatedCounter value={stat.value as number} />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Recent Tickets</h2>
                <p className="text-sm text-muted-foreground">Your latest support requests</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tickets">View All</Link>
                </Button>
              </div>
            </div>

            <div className="divide-y divide-border/50">
              {mockTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
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

            {mockTickets.length === 0 && (
              <div className="p-12 text-center">
                <Ticket className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No tickets yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first ticket to get help from our team.
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