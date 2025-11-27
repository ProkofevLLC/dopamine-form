import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { useState } from "react";

interface RatingScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  showPlus?: boolean;
}

export const RatingScale = ({ value, onChange, showPlus = true }: RatingScaleProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleSelect = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[...Array(10)].map((_, index) => {
          const rating = index + 1;
          const isSelected = value === rating;
          const isHovered = hoveredValue === rating;
          const shouldHighlight = hoveredValue ? rating <= hoveredValue : value ? rating <= value : false;

          return (
            <motion.button
              key={rating}
              onClick={() => handleSelect(rating)}
              onMouseEnter={() => setHoveredValue(rating)}
              onMouseLeave={() => setHoveredValue(null)}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative w-14 h-14 rounded-full flex items-center justify-center
                font-bold text-lg transition-all duration-300
                ${shouldHighlight
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
              `}
            >
              {rating}
              {isSelected && (
                <motion.div
                  layoutId="rating-indicator"
                  className="absolute inset-0 rounded-full border-4 border-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}

        {showPlus && value !== null && value >= 10 && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => onChange(11)}
            className={`
              relative w-16 h-16 rounded-full flex items-center justify-center
              font-bold text-lg transition-all duration-300
              ${value === 11
                ? "bg-gradient-to-br from-accent via-primary to-secondary text-primary-foreground animate-glow"
                : "bg-gradient-to-br from-primary to-accent text-primary-foreground glow-accent"
              }
            `}
          >
            <Sparkles className="w-5 h-5 mr-1" />
            10+
            {value === 11 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(270 70% 60% / 0.5)",
                    "0 0 40px hsl(330 80% 65% / 0.8)",
                    "0 0 20px hsl(270 70% 60% / 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        )}
      </div>

      {/* Подсказки */}
      {value !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {value === 11 && <Sparkles className="w-5 h-5 text-accent" />}
            <span className="text-2xl">
              {value === 11 ? "🚀🌟" : value === 10 ? "🎯" : value >= 8 ? "👍" : value >= 6 ? "😐" : "⚠️"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {value === 11
              ? "Невероятно! Максимальная оценка!"
              : value === 10
              ? "Отлично! Можете добавить 10+ для супер-оценки"
              : value >= 8
              ? "Очень хорошо!"
              : value >= 6
              ? "Нормально, есть что улучшить"
              : "Требуется внимание"}
          </p>
        </motion.div>
      )}
    </div>
  );
};
