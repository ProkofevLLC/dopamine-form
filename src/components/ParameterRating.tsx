import { motion } from "framer-motion";
import { useState } from "react";

interface Parameter {
  id: string;
  name: string;
  emoji: string;
  value: number | null;
}

interface ParameterRatingProps {
  parameters: Parameter[];
  onParametersChange: (parameters: Parameter[]) => void;
}

export const ParameterRating = ({ parameters, onParametersChange }: ParameterRatingProps) => {
  const [hoveredParam, setHoveredParam] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleRatingChange = (paramId: string, value: number) => {
    onParametersChange(
      parameters.map((param) =>
        param.id === paramId ? { ...param, value } : param
      )
    );
  };

  return (
    <div className="space-y-6">
      {parameters.map((param, index) => (
        <motion.div
          key={param.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              className="text-3xl"
              animate={hoveredParam === param.id ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {param.emoji}
            </motion.span>
            <h3 className="text-lg font-semibold">{param.name}</h3>
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {[...Array(10)].map((_, index) => {
              const rating = index + 1;
              const isSelected = param.value === rating;
              const shouldHighlight = 
                hoveredParam === param.id && hoveredValue
                  ? rating <= hoveredValue
                  : param.value
                  ? rating <= param.value
                  : false;

              return (
                <motion.button
                  key={rating}
                  onClick={() => handleRatingChange(param.id, rating)}
                  onMouseEnter={() => {
                    setHoveredParam(param.id);
                    setHoveredValue(rating);
                  }}
                  onMouseLeave={() => {
                    setHoveredParam(null);
                    setHoveredValue(null);
                  }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center
                    font-semibold text-sm transition-all duration-200
                    ${shouldHighlight
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }
                  `}
                >
                  {rating}
                  {isSelected && (
                    <motion.div
                      layoutId={`param-indicator-${param.id}`}
                      className="absolute inset-0 rounded-lg border-2 border-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {param.value && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 text-center text-sm text-success font-medium"
            >
              ⚡ {param.value}/10
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
