import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import ServiceFleetMonitor from "@/components/ServiceFleetMonitor";
import LiveTerminal from "@/components/LiveTerminal";
import PatchAnalysis from "@/components/PatchAnalysis";
import IntegrationSetup from "@/components/IntegrationSetup";
import HealthChart from "@/components/HealthChart";
import { Server, ShieldCheck, Calculator, CreditCard, Database } from "lucide-react";

interface TerminalLog {
  id: number;
  type: "system" | "agent" | "success" | "error";
  message: string;
  timestamp: string;
}

const services = [
  { id: "auth", name: "Auth-Service", icon: ShieldCheck, status: "live" as const },
  { id: "gateway", name: "Gateway-Proxy", icon: Server, status: "live" as const },
  { id: "tax", name: "Tax-Calculator", icon: Calculator, status: "live" as const },
  { id: "billing", name: "Billing-Worker", icon: CreditCard, status: "live" as const },
  { id: "db", name: "DB-Node-01", icon: Database, status: "live" as const },
];

const initialHealthData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  health: 95 + Math.random() * 5,
}));

const chaosLogs: Omit<TerminalLog, "id" | "timestamp">[] = [
  { type: "error", message: "CRITICAL: 500 Internal Server Error in Tax-Calculator." },
  { type: "system", message: "LOG: ZeroDivisionError at tax_engine.py:42." },
  { type: "agent", message: "🔍 Spawning Diagnosis Agent... Analyzing stack trace." },
  { type: "agent", message: "🧠 Root Cause: Guard clause missing for zero-value input in calculation." },
  { type: "agent", message: "🛠️ Spawning Coding Agent... Generating patch." },
  { type: "agent", message: "🧪 Spawning Test Agent... Initializing Docker Sandbox." },
  { type: "success", message: "✅ Test Pass: 14/14 unit tests successful." },
  { type: "success", message: "🚀 Patch Deployed via Automated CI/CD. Service Restored." },
];

const Index = () => {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [chaosServiceId, setChaosServiceId] = useState<string | null>(null);
  const [healthData, setHealthData] = useState(initialHealthData);
  const [isPatchVisible, setIsPatchVisible] = useState(false);
  const [isPatchComplete, setIsPatchComplete] = useState(false);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  };

  const simulateChaos = useCallback(async () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setLogs([]);
    setChaosServiceId("tax");
    setIsPatchVisible(false);
    setIsPatchComplete(false);

    // Dip health data
    setHealthData((prev) => [
      ...prev.slice(1),
      { time: `${prev.length}s`, health: 35 + Math.random() * 10 },
    ]);

    // Type each log with delays
    for (let i = 0; i < chaosLogs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

      const log = chaosLogs[i];
      setLogs((prev) => [
        ...prev,
        { ...log, id: Date.now(), timestamp: getTimestamp() },
      ]);

      // Show patch after diagnosis
      if (i === 3) {
        setIsPatchVisible(true);
      }

      // Update health during recovery
      if (i >= 5) {
        setHealthData((prev) => [
          ...prev.slice(1),
          { time: `${prev.length}s`, health: 60 + i * 5 + Math.random() * 5 },
        ]);
      }
    }

    // Recovery complete
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setChaosServiceId(null);
    setIsPatchComplete(true);

    // Restore health
    setHealthData((prev) => [
      ...prev.slice(1),
      { time: `${prev.length}s`, health: 97 + Math.random() * 3 },
    ]);

    setIsSimulating(false);
  }, [isSimulating]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              <div className="relative p-3 rounded-xl bg-primary/10 border border-primary/30">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-hacker tracking-tight">
                AEGIS
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Self-Healing Infrastructure Swarm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/20">
              <Zap className="w-4 h-4 text-aegis-yellow" />
              <span className="text-xs font-mono text-muted-foreground">
                Region: <span className="text-card-foreground">us-east-1</span>
              </span>
            </div>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30"
              animate={{ boxShadow: ["0 0 10px rgba(0,255,65,0.1)", "0 0 20px rgba(0,255,65,0.2)", "0 0 10px rgba(0,255,65,0.1)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-primary pulse-live" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                All Systems Operational
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Column 1: Service Fleet */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <ServiceFleetMonitor
            services={services}
            onInjectChaos={simulateChaos}
            isSimulating={isSimulating}
            chaosServiceId={chaosServiceId}
          />
        </motion.div>

        {/* Column 2: Live Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 min-h-[500px]"
        >
          <LiveTerminal logs={logs} isActive={isSimulating} />
        </motion.div>

        {/* Column 3: Patch Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4"
        >
          <PatchAnalysis isVisible={isPatchVisible} isPatchComplete={isPatchComplete} />
        </motion.div>
      </div>

      {/* Health Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <HealthChart data={healthData} isInCrash={chaosServiceId !== null} />
      </motion.div>

      {/* Integration Setup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <IntegrationSetup />
      </motion.div>
    </div>
  );
};

export default Index;
