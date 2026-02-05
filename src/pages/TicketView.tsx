import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Clock,
  User,
  X,
  AlertTriangle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge, PriorityBadge } from "@/components/ui/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mockTickets } from "@/lib/mockData";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function TicketView() {
  const { id } = useParams();
  const ticket = mockTickets.find((t) => t.id === id) || mockTickets[0];
  
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendReply = () => {
    if (!reply.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setReply("");
      toast({
        title: "Reply sent",
        description: "Your message has been sent to our support team.",
      });
    }, 1000);
  };

  const handleCloseTicket = () => {
    toast({
      title: "Ticket closed",
      description: "This ticket has been marked as closed.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tickets
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
              </div>
              <h1 className="text-2xl font-bold">{ticket.subject}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {format(new Date(ticket.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </span>
                <span className="capitalize">{ticket.category.replace("-", " ")}</span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Ticket</DropdownMenuItem>
                <DropdownMenuItem>Change Priority</DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive focus:text-destructive"
                    >
                      Close Ticket
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Close this ticket?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will mark the ticket as resolved. You can reopen it later if needed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCloseTicket}>
                        Close Ticket
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Assigned Staff Info */}
        {ticket.assignedTo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <GlassCard className="p-4 flex items-center gap-3" hover={false}>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {ticket.assignedTo.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{ticket.assignedTo.name}</div>
                <div className="text-xs text-muted-foreground">Assigned to this ticket</div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          {ticket.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard 
                className={cn(
                  "p-5",
                  message.isStaff && "border-l-4 border-l-primary"
                )}
                hover={false}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className={cn(
                      message.isStaff ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                    )}>
                      {message.author.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.author.name}</span>
                        {message.isStaff && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Staff
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(message.createdAt), "MMM d, h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {message.content}
                    </p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {message.attachments.map((attachment, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm"
                          >
                            <Paperclip className="w-4 h-4" />
                            {attachment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Reply Box */}
        {ticket.status !== "closed" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-5" hover={false}>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="min-h-[120px] bg-muted/50 border-border/50"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    <Paperclip className="w-4 h-4" />
                    Attach files
                    <input type="file" multiple className="hidden" />
                  </label>
                  <Button
                    onClick={handleSendReply}
                    disabled={!reply.trim() || isLoading}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <GlassCard className="p-5 text-center" hover={false}>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <AlertTriangle className="w-5 h-5" />
              This ticket is closed. Need more help?{" "}
              <Link to="/tickets/new" className="text-primary hover:underline">
                Create a new ticket
              </Link>
            </div>
          </GlassCard>
        )}
      </div>
    </Layout>
  );
}