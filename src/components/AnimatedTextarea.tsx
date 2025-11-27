import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Bold, Italic, List, Quote } from "lucide-react";

interface AnimatedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  showFormatting?: boolean;
}

export const AnimatedTextarea = ({
  value,
  onChange,
  placeholder,
  maxLength = 1000,
  showFormatting = true,
}: AnimatedTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const length = value.length;
  const percentage = (length / maxLength) * 100;

  const getProgressColor = () => {
    if (percentage < 30) return "bg-destructive";
    if (percentage < 70) return "bg-warning";
    return "bg-success";
  };

  const getProgressGradient = () => {
    if (percentage < 30) return "from-destructive/20 to-destructive";
    if (percentage < 70) return "from-warning/20 to-warning";
    return "from-success/20 to-success";
  };

  const showEncouragement = length >= 200 && length < 220;

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="space-y-3">
      {showFormatting && (
        <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => insertFormatting("**")}
            className="h-8 w-8"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => insertFormatting("*")}
            className="h-8 w-8"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => insertFormatting("\n- ", "")}
            className="h-8 w-8"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => insertFormatting("\n> ", "")}
            className="h-8 w-8"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            min-h-[200px] resize-none transition-all duration-300
            ${isFocused ? "ring-2 ring-primary" : ""}
          `}
        />
        
        {isFocused && (
          <motion.div
            className="absolute -inset-[1px] rounded-lg pointer-events-none -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 blur-sm" />
          </motion.div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {length} / {maxLength}
          </span>
          <span className={`font-medium ${percentage >= 70 ? "text-success" : "text-muted-foreground"}`}>
            {Math.round(percentage)}%
          </span>
        </div>

        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getProgressGradient()} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {showEncouragement && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/20"
          >
            <span className="text-xl">🔥</span>
            <span className="text-success font-medium text-sm">Отлично, продолжай!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
