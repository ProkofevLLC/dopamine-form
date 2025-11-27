import { motion } from "framer-motion";
import { Step } from "@/pages/FeedbackDashboard";
import { Button } from "@/components/ui/button";
import { Check, Circle, Lock, Star, ExternalLink } from "lucide-react";

interface TimelineStepProps {
  step: Step;
  index: number;
  isLast: boolean;
  onAction: () => void;
}

const statusIcons = {
  completed: Check,
  active: Star,
  pending: Circle,
  locked: Lock,
};

const statusStyles = {
  completed: "bg-success text-success-foreground shadow-[0_0_12px_hsl(140_70%_55%/0.4)]",
  active: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_16px_hsl(270_70%_60%/0.5)] animate-pulse",
  pending: "bg-muted text-muted-foreground border-2 border-border",
  locked: "bg-muted/50 text-muted-foreground/50",
};

export const TimelineStep = ({ step, index, isLast, onAction }: TimelineStepProps) => {
  const Icon = statusIcons[step.status];
  const isActive = step.status === "active";
  const isCompleted = step.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="relative pl-14 pb-6"
    >
      {/* Icon */}
      <motion.div
        whileHover={step.status !== "locked" ? { scale: 1.1 } : undefined}
        className={`absolute left-3 w-7 h-7 rounded-full flex items-center justify-center z-20 ${statusStyles[step.status]}`}
      >
        <Icon className="w-4 h-4" />
      </motion.div>

      {/* Content */}
      <motion.div
        whileHover={step.status !== "locked" ? { x: 4 } : undefined}
        className={`p-4 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
            : isCompleted
            ? "bg-success/5 border border-success/20"
            : step.status === "locked"
            ? "bg-muted/30 opacity-60"
            : "bg-muted/50 border border-transparent hover:border-border/50"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className={`font-semibold ${
                step.status === "locked" ? "text-muted-foreground" : "text-foreground"
              }`}>
                {step.title}
              </h4>
              {isCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-success text-xs"
                >
                  ✓ Выполнено
                </motion.span>
              )}
            </div>
            <p className={`text-sm mt-1 ${
              step.status === "locked" ? "text-muted-foreground/50" : "text-muted-foreground"
            }`}>
              {step.description}
            </p>
          </div>

          {step.hasAction && step.status === "active" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={onAction}
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Открыть
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
