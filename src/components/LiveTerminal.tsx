import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Circle } from "lucide-react";

interface TerminalLog {
  id: number;
  type: "system" | "agent" | "success" | "error";
  message: string;
  timestamp: string;
}

interface LiveTerminalProps {
  logs: TerminalLog[];
  isActive: boolean;
}

const LiveTerminal = ({ logs, isActive }: LiveTerminalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: TerminalLog["type"]) => {
    switch (type) {
      case "error":
        return "text-destructive text-glow-red";
      case "agent":
        return "text-aegis-cyan";
      case "success":
        return "text-primary text-glow-green";
      default:
        return "text-aegis-yellow";
    }
  };

  const getPrefix = (type: TerminalLog["type"]) => {
    switch (type) {
      case "error":
        return "[SYSTEM]";
      case "agent":
        return "[AGENT]";
      case "success":
        return "[SYSTEM]";
      default:
        return "[SYSTEM]";
    }
  };

  return (
    <div className="terminal-window h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-aegis-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono">Aegis-Agent-v1.0.4</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-primary pulse-live" : "bg-muted-foreground"
            }`}
            animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground font-mono">
            {isActive ? "Active Observation" : "Standby"}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm relative"
      >
        {/* Scanline effect */}
        <div className="scanline absolute inset-0 pointer-events-none" />

        <AnimatePresence mode="popLayout">
          {logs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
            >
              <p className="text-primary">$ aegis monitor --watch</p>
              <p className="mt-2 text-muted-foreground/70">
                Awaiting system events... All services operational.
              </p>
              <motion.span
                className="inline-block w-2 h-4 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          )}

          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <span className="text-muted-foreground/50 mr-3">
                {log.timestamp}
              </span>
              <span className={`${getLogColor(log.type)} font-semibold mr-2`}>
                {getPrefix(log.type)}
              </span>
              <TypewriterText
                text={log.message}
                delay={index * 100}
                className={getLogColor(log.type)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor */}
        {logs.length > 0 && (
          <motion.div className="flex items-center mt-2">
            <span className="text-primary">$</span>
            <motion.span
              className="inline-block w-2 h-4 bg-primary ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TypewriterText = ({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

export default LiveTerminal;
