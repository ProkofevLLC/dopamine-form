import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      animate={{
        width: isFocused ? 320 : 280,
      }}
      className="relative"
    >
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
        isFocused ? "text-primary" : "text-muted-foreground"
      }`} />
      
      <Input
        type="text"
        placeholder="ФИО, логин, должность или отдел"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`pl-9 pr-8 h-10 bg-card border-border/50 transition-all ${
          isFocused ? "border-primary shadow-lg ring-2 ring-primary/20" : ""
        }`}
      />

      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
