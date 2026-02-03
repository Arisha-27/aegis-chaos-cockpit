import { motion } from "framer-motion";
import { GitPullRequest, CheckCircle, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface PatchAnalysisProps {
  isVisible: boolean;
  isPatchComplete: boolean;
}

const PatchAnalysis = ({ isVisible, isPatchComplete }: PatchAnalysisProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://github.com/aegis/tax-calculator/pull/1847");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <GitPullRequest className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-card-foreground">
          Patch Analysis & Approval
        </h2>
      </div>

      {/* Code Diff Section */}
      <div className="flex-1 space-y-4">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isVisible ? 1 : 0.3 }}
          className="terminal-window overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-border/30 bg-muted/20">
            <span className="text-xs font-mono text-muted-foreground">
              tax_engine.py — Line 42
            </span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1">
            <div className="text-muted-foreground/50 text-xs mb-3">
              @@ -40,7 +40,7 @@ def calculate_tax(total, count):
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
              transition={{ delay: 0.2 }}
              className="diff-remove px-3 py-1 rounded flex items-center gap-2"
            >
              <span className="text-destructive font-bold">-</span>
              <span>result = total / count</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
              transition={{ delay: 0.4 }}
              className="diff-add px-3 py-1 rounded flex items-center gap-2"
            >
              <span className="text-primary font-bold">+</span>
              <span>result = total / count if count {">"} 0 else 0</span>
            </motion.div>

            <div className="text-muted-foreground/30 mt-3 text-xs">
              # Added guard clause for zero-value input protection
            </div>
          </div>
        </motion.div>

        {/* Pull Request Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isPatchComplete ? 1 : 0.3, y: isPatchComplete ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GitPullRequest className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  PR #1847
                </p>
                <p className="text-xs text-muted-foreground">
                  Fix: Add zero-division guard
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPatchComplete ? 1 : 0 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase">
                Auto-Approved
              </span>
            </motion.div>
          </div>

          {/* GitHub Link */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/20">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-xs font-mono text-muted-foreground truncate">
              github.com/aegis/tax-calculator/pull/1847
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-muted/50 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "CI/CD", status: "passed" },
              { label: "Tests", status: "14/14" },
              { label: "Coverage", status: "94%" },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isPatchComplete ? 1 : 0.5, scale: isPatchComplete ? 1 : 0.8 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 border border-primary/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-mono text-primary">
                  {badge.label}: {badge.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatchAnalysis;
