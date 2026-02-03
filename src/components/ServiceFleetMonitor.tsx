import { motion } from "framer-motion";
import { Server, Shield, Calculator, CreditCard, Database } from "lucide-react";

interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "live" | "error" | "healing";
}

interface ServiceFleetMonitorProps {
  services: Service[];
  onInjectChaos: () => void;
  isSimulating: boolean;
  chaosServiceId: string | null;
}

const ServiceFleetMonitor = ({
  services,
  onInjectChaos,
  isSimulating,
  chaosServiceId,
}: ServiceFleetMonitorProps) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary pulse-live" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-card-foreground">
          Service Fleet Monitor
        </h2>
      </div>

      <div className="flex-1 space-y-3">
        {services.map((service, index) => {
          const isAffected = chaosServiceId === service.id;
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                isAffected
                  ? "glass-card-danger border-destructive/50"
                  : "bg-muted/30 border border-border/20"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isAffected
                    ? "bg-destructive/20"
                    : "bg-primary/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isAffected ? "text-destructive" : "text-primary"
                  }`}
                />
              </div>

              <div className="flex-1">
                <p
                  className={`font-medium text-sm ${
                    isAffected ? "text-destructive" : "text-card-foreground"
                  }`}
                >
                  {service.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isAffected ? "CRITICAL FAILURE" : "Operational"}
                </p>
              </div>

              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isAffected
                    ? "bg-destructive pulse-danger glow-red"
                    : "bg-primary pulse-live glow-green"
                }`}
                animate={
                  isAffected
                    ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }
                    : { scale: [1, 1.1, 1] }
                }
                transition={{
                  duration: isAffected ? 0.3 : 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.button
        onClick={onInjectChaos}
        disabled={isSimulating}
        className="chaos-button mt-6 w-full py-4 rounded-lg font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isSimulating ? 1 : 1.02 }}
        whileTap={{ scale: isSimulating ? 1 : 0.98 }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            className="w-3 h-3 rounded-full bg-destructive"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {isSimulating ? "SIMULATION IN PROGRESS..." : "INJECT CHAOS / SIMULATE FAILURE"}
        </div>
      </motion.button>
    </div>
  );
};

export default ServiceFleetMonitor;
