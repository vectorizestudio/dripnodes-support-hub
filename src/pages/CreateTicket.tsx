import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Send,
  Paperclip,
  CreditCard,
  Server,
  Gamepad2,
  User,
  HelpCircle,
  X
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  { id: "billing", label: "Billing Support", icon: CreditCard, description: "Payment, invoices, refunds" },
  { id: "technical", label: "Technical Support", icon: Server, description: "Server issues, performance" },
  { id: "gameserver", label: "Game Server Support", icon: Gamepad2, description: "Game panel, mods, setup" },
  { id: "account", label: "Account Help", icon: User, description: "Profile, email, password" },
  { id: "general", label: "General Inquiry", icon: HelpCircle, description: "Other questions" },
];

const priorities = [
  { value: "low", label: "Low", description: "General questions, not urgent" },
  { value: "medium", label: "Medium", description: "Issue affecting service" },
  { value: "high", label: "High", description: "Major issue, needs attention" },
  { value: "urgent", label: "Urgent", description: "Critical, service down" },
];

export default function CreateTicket() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  
  const [category, setCategory] = useState(initialCategory);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [service, setService] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate ticket creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Ticket created!",
        description: "Your support ticket has been submitted successfully.",
      });
      navigate("/tickets/TKT-005");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Support Ticket</h1>
          <p className="text-muted-foreground">
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <GlassCard className="p-6 md:p-8 space-y-6">
              {/* Category Selection */}
              <div className="space-y-3">
                <Label>Category *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all duration-200",
                        category === cat.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 hover:border-primary/50 bg-muted/30"
                      )}
                    >
                      <cat.icon className={cn(
                        "w-5 h-5 mb-2",
                        category === cat.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="font-medium text-sm">{cat.label}</div>
                      <div className="text-xs text-muted-foreground">{cat.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-muted/50 border-border/50"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide as much detail as possible about your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px] bg-muted/50 border-border/50"
                  required
                />
              </div>

              {/* Priority & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <div>
                            <div className="font-medium">{p.label}</div>
                            <div className="text-xs text-muted-foreground">{p.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Related Service (Optional)</Label>
                  <Input
                    id="service"
                    placeholder="e.g., Server #12345"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="bg-muted/50 border-border/50"
                  />
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm"
                    >
                      <Paperclip className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-colors">
                    <Paperclip className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add file</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Max 10MB per file. Supported: images, PDFs, documents
                </p>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  disabled={isLoading || !category || !subject || !description}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Ticket
                    </div>
                  )}
                </Button>
              </div>
            </GlassCard>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}