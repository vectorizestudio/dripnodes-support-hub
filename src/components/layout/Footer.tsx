import { Link } from "react-router-dom";
import { Ticket, ExternalLink, MessageCircle, FileText, Shield, Activity } from "lucide-react";

const mainLinks = [
  { label: "Main Site", href: "https://dripnodes.site", external: true },
  { label: "Billing Panel", href: "https://billing.dripnodes.site", external: true },
  { label: "Game Panel", href: "https://gp.dripnodes.site", external: true },
];

const supportLinks = [
  { label: "Create Ticket", href: "/tickets/new" },
  { label: "Knowledge Base", href: "/kb" },
  { label: "Status Page", href: "/status" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Ticket className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg gradient-text">DripNodes</span>
                <p className="text-xs text-muted-foreground">Support Portal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium hosting solutions with 24/7 expert support. We're here to help you succeed.
            </p>
            <a
              href="https://discord.gg/dripnodes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Join our Discord
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                to="/status"
                className="inline-flex items-center gap-2 text-sm text-success"
              >
                <Activity className="w-4 h-4" />
                All Systems Operational
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DripNodes. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Powered by DripNodes Infrastructure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}