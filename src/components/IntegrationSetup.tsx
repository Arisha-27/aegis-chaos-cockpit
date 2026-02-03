import { motion } from "framer-motion";
import { Cloud, GitBranch, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

const IntegrationSetup = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install aegis-monitor && aegis init --key=AG_77X");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const integrations = [
    {
      id: "infra",
      title: "Infrastructure",
      description: "Connect your cloud provider",
      icon: Cloud,
      items: [
        { name: "AWS", logo: "🔶" },
        { name: "GCP", logo: "🔵" },
        { name: "Azure", logo: "🔷" },
      ],
    },
    {
      id: "code",
      title: "Code Access",
      description: "Link your repositories",
      icon: GitBranch,
      items: [
        { name: "GitHub", logo: "⚫" },
        { name: "GitLab", logo: "🟠" },
        { name: "Bitbucket", logo: "🔵" },
      ],
    },
    {
      id: "agent",
      title: "Watchdog Agent",
      description: "Install the monitoring agent",
      icon: Terminal,
      isCommand: true,
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-card-foreground">
          Integration Setup
        </h2>
        <span className="text-xs text-muted-foreground">— How it works</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;

          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-muted/20 border border-border/20 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {integration.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {integration.description}
                  </p>
                </div>
              </div>

              {integration.isCommand ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-black/50 border border-border/20 font-mono text-xs">
                  <span className="text-muted-foreground flex-1 truncate">
                    <span className="text-primary">$</span>{" "}
                    pip install aegis-monitor && aegis init --key=AG_77X
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-muted/30 transition-colors shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  {integration.items?.map((item) => (
                    <button
                      key={item.name}
                      className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg bg-black/30 border border-border/20 hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <span className="text-xl">{item.logo}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationSetup;
