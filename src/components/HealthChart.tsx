import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";

interface HealthChartProps {
  data: { time: string; health: number }[];
  isInCrash: boolean;
}

const HealthChart = ({ data, isInCrash }: HealthChartProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-card-foreground">
              System Health Heartbeat
            </h2>
            <p className="text-xs text-muted-foreground">
              Real-time infrastructure vitals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isInCrash ? "bg-destructive pulse-danger" : "bg-primary pulse-live"
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: isInCrash ? 0.3 : 1, repeat: Infinity }}
            />
            <span
              className={`text-xs font-mono ${
                isInCrash ? "text-destructive" : "text-primary"
              }`}
            >
              {isInCrash ? "DEGRADED" : "HEALTHY"}
            </span>
          </div>

          <div className="text-right">
            <p
              className={`text-2xl font-bold font-mono ${
                isInCrash ? "text-destructive text-glow-red" : "text-primary text-glow-green"
              }`}
            >
              {data[data.length - 1]?.health || 0}%
            </p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isInCrash ? "#FF3131" : "#00FF41"}
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor={isInCrash ? "#FF3131" : "#00FF41"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 10 }}
            />
            <YAxis hide domain={[0, 100]} />
            <Area
              type="monotone"
              dataKey="health"
              stroke={isInCrash ? "#FF3131" : "#00FF41"}
              strokeWidth={2}
              fill="url(#healthGradient)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between mt-4 pt-4 border-t border-border/20">
        {[
          { label: "Uptime", value: "99.97%", color: "text-primary" },
          { label: "Avg Response", value: "42ms", color: "text-aegis-cyan" },
          { label: "Errors (24h)", value: isInCrash ? "1" : "0", color: isInCrash ? "text-destructive" : "text-primary" },
          { label: "Auto-Heals", value: isInCrash ? "1" : "0", color: "text-aegis-purple" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className={`text-lg font-bold font-mono ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthChart;
