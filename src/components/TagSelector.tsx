import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  colors?: string[];
}

const defaultColors = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500",
  "from-yellow-500 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-red-500 to-pink-500",
];

export const TagSelector = ({
  tags,
  selectedTags,
  onTagsChange,
  maxTags = 3,
  colors = defaultColors,
}: TagSelectorProps) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag) && selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, customTag.trim()]);
      setCustomTag("");
      setIsAddingCustom(false);
    }
  };

  const isMaxReached = selectedTags.length >= maxTags;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag, index) => {
          const isSelected = selectedTags.includes(tag);
          const isDisabled = !isSelected && isMaxReached;
          const colorClass = colors[index % colors.length];

          return (
            <motion.button
              key={tag}
              onClick={() => handleToggleTag(tag)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              className={`
                relative px-6 py-3 rounded-full font-medium text-sm
                transition-all duration-300
                ${isSelected
                  ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                  : isDisabled
                  ? "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  : "bg-muted text-foreground hover:bg-muted/80"
                }
              `}
            >
              {tag}
              {isSelected && (
                <motion.div
                  layoutId={`tag-check-${tag}`}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <span className="text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {isMaxReached && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-3 rounded-xl bg-success/10 border border-success/20"
        >
          <span className="text-success font-medium">💡 Ты выбрал максимум! Отличный выбор.</span>
        </motion.div>
      )}

      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {!isAddingCustom ? (
            <motion.div
              key="add-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={() => setIsAddingCustom(true)}
                variant="outline"
                disabled={isMaxReached}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Создать свой тег
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="custom-input"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2"
            >
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomTag()}
                placeholder="Введи свой вариант..."
                className="w-64"
                autoFocus
              />
              <Button onClick={handleAddCustomTag} size="icon" className="gradient-primary">
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => {
                  setIsAddingCustom(false);
                  setCustomTag("");
                }}
                size="icon"
                variant="ghost"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
