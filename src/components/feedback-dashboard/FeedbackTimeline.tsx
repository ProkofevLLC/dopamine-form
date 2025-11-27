import { motion } from "framer-motion";
import { Step } from "@/pages/FeedbackDashboard";
import { TimelineStep } from "./TimelineStep";

interface FeedbackTimelineProps {
  steps: Step[];
  progress: number;
  onStepAction: (stepId: string) => void;
}

export const FeedbackTimeline = ({ steps, progress, onStepAction }: FeedbackTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl p-6 shadow-lg border border-border/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Этапы ОС-360</h3>
        <span className="text-sm text-muted-foreground">
          {steps.filter(s => s.status === "completed").length} из {steps.length} выполнено
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
        
        {/* Completed portion of the line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${(progress / 100) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-success via-primary to-primary/50 z-10"
        />

        {/* Steps */}
        <div className="space-y-1">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              onAction={() => onStepAction(step.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
