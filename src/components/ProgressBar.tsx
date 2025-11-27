import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const getProgressEmoji = (percentage: number) => {
  if (percentage <= 10) return "🙂";
  if (percentage <= 30) return "🙂👍";
  if (percentage <= 50) return "😎";
  if (percentage <= 70) return "🚀";
  if (percentage <= 90) return "🏆";
  return "🎉";
};

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;
  const emoji = getProgressEmoji(percentage);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Шаг {currentStep + 1} из {totalSteps}
        </span>
        <motion.span
          key={emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="text-2xl"
        >
          {emoji}
        </motion.span>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Wave effect */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: `${percentage}%` }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};
