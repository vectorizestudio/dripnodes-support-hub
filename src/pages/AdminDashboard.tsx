import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Ticket, 
  Users, 
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Settings,
  ArrowRight,
  Star,
  BarChart3
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/ui/StatusBadge";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { mockTickets, mockAdminStats, mockStaff } from "@/lib/mockData";
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
    label: "Total Tickets",
    value: mockAdminStats.totalTickets,
    icon: Ticket,
    color: "text-primary",
    bgColor: "bg-primary/10",
    trend: "+12%",
    trendUp: true,
  },
  {
    label: "Open Tickets",
    value: mockAdminStats.openTickets,
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    trend: "-5%",
    trendUp: false,
  },
  {
    label: "Avg Response Time",
    value: mockAdminStats.avgResponseTime,
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
    isText: true,
    trend: "-8min",
    trendUp: true,
  },
  {
    label: "Satisfaction Rate",
    value: mockAdminStats.satisfactionRate,
    icon: Star,
    color: "text-success",
    bgColor: "bg-success/10",
    suffix: "%",
    trend: "+2%",
    trendUp: true,
  },
];

const quickActions = [
  { label: "Manage Tickets", icon: Ticket, href: "/admin/tickets" },
  { label: "Manage Staff", icon: Users, href: "/admin/staff" },
  { label: "Categories", icon: BarChart3, href: "/admin/categories" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminDashboard() {
  // Calculate percentages for the donut chart simulation
  const openPercent = (mockAdminStats.openTickets / mockAdminStats.totalTickets) * 100;
  const answeredPercent = (mockAdminStats.answeredTickets / mockAdminStats.totalTickets) * 100;
  const closedPercent = (mockAdminStats.closedTickets / mockAdminStats.totalTickets) * 100;

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
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of support operations and team performance
            </p>
          </div>
          <div className="flex gap-3">
            {quickActions.slice(0, 2).map((action) => (
              <Button key={action.label} variant="outline" size="sm" asChild>
                <Link to={action.href} className="flex items-center gap-2">
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Link>
              </Button>
            ))}
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
                  <span className={`text-xs font-medium ${stat.trendUp ? "text-success" : "text-destructive"}`}>
                    {stat.trend}
                  </span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ticket Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="font-semibold mb-6">Ticket Distribution</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      Open
                    </span>
                    <span className="font-medium">{mockAdminStats.openTickets}</span>
                  </div>
                  <Progress value={openPercent} className="h-2 bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-info" />
                      Answered
                    </span>
                    <span className="font-medium">{mockAdminStats.answeredTickets}</span>
                  </div>
                  <Progress value={answeredPercent} className="h-2 bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      Closed
                    </span>
                    <span className="font-medium">{mockAdminStats.closedTickets}</span>
                  </div>
                  <Progress value={closedPercent} className="h-2 bg-muted" />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={mockAdminStats.ticketsToday} />
                    </div>
                    <div className="text-sm text-muted-foreground">Tickets today</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">
                      <AnimatedCounter value={mockAdminStats.resolvedToday} />
                    </div>
                    <div className="text-sm text-muted-foreground">Resolved today</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Staff Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Staff Performance</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/staff">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {mockStaff.map((staff, index) => (
                  <motion.div
                    key={staff.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {staff.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{staff.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                          {staff.role}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {staff.ticketsResolved} tickets resolved
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{staff.avgRating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Recent Tickets</h2>
                <p className="text-sm text-muted-foreground">Latest support requests requiring attention</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/tickets">View All Tickets</Link>
              </Button>
            </div>

            <div className="divide-y divide-border/50">
              {mockTickets.filter(t => t.status !== "closed").map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={`/admin/tickets/${ticket.id}`}
                    className="block p-5 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Avatar className="w-10 h-10 shrink-0">
                          <AvatarFallback className="bg-secondary/10 text-secondary">
                            {ticket.user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">
                              {ticket.id}
                            </span>
                            <StatusBadge status={ticket.status} />
                            <PriorityBadge priority={ticket.priority} />
                          </div>
                          <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                            {ticket.subject}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {ticket.user.name} • {ticket.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                          </div>
                          {ticket.assignedTo ? (
                            <div className="text-xs text-muted-foreground/60">
                              Assigned to {ticket.assignedTo.name}
                            </div>
                          ) : (
                            <div className="text-xs text-warning">Unassigned</div>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Layout>
  );
}