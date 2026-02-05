import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Ticket, 
  CreditCard, 
  Server, 
  Gamepad2, 
  HelpCircle,
  Search,
  ArrowRight,
  Zap,
  Clock,
  Shield
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const supportCategories = [
  {
    icon: Ticket,
    title: "Open Ticket",
    description: "Create a new support ticket for personalized assistance",
    href: "/tickets/new",
    color: "from-primary to-primary/60",
  },
  {
    icon: CreditCard,
    title: "Billing Help",
    description: "Questions about payments, invoices, or subscriptions",
    href: "/tickets/new?category=billing",
    color: "from-secondary to-secondary/60",
  },
  {
    icon: Server,
    title: "Technical Support",
    description: "Server issues, performance, and configuration help",
    href: "/tickets/new?category=technical",
    color: "from-info to-info/60",
  },
  {
    icon: Gamepad2,
    title: "Game Panel Help",
    description: "Assistance with game server management and setup",
    href: "/tickets/new?category=gameserver",
    color: "from-success to-success/60",
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast Response",
    description: "Average response time under 2 hours",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "We're here whenever you need us",
  },
  {
    icon: Shield,
    title: "Expert Team",
    description: "Skilled professionals at your service",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-glow">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Ticket className="w-4 h-4" />
              Premium Support Portal
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              How Can We{" "}
              <span className="gradient-text">Help You</span>
              <br />
              Today?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get expert assistance from the DripNodes team. We're committed to providing 
              fast, reliable support for all your hosting needs.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge base..."
                  className="pl-12 pr-4 py-6 text-base bg-muted/50 border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-base px-8" asChild>
                <Link to="/tickets/new">
                  Create Ticket
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link to="/dashboard">
                  View My Tickets
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Do You Need Help With?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a category below to get started with your support request
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {supportCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={category.href}>
                  <GlassCard className="h-full group cursor-pointer">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Get Help <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                    <HelpCircle className="w-4 h-4" />
                    Need Quick Answers?
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Check Our Knowledge Base
                  </h2>
                  <p className="text-muted-foreground">
                    Find instant answers to common questions in our comprehensive documentation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/kb">Browse Articles</Link>
                  </Button>
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90" asChild>
                    <Link to="/tickets/new">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
